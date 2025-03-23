using FirebaseAdmin.Messaging;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NotificationService.Infrastructure.Services.FirebaseService;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

namespace NotificationService.Infrastructure.Services.RabbitMQ
{
    public class RabbitMQClient : BackgroundService
    {
        private IConnection _connection;
        private IChannel _channel;
        private IHostApplicationLifetime _applicationLifetime;
        private readonly IConfiguration _configuration;
        private readonly string _queueName;
        private readonly IServiceScopeFactory _serviceScopeFactory;
        public RabbitMQClient(IConfiguration configuration, IServiceScopeFactory serviceScopeFactory)
        {
            _configuration = configuration;
            _queueName = _configuration["RabbitMQ:QueueName"];
            _serviceScopeFactory = serviceScopeFactory;
        }

        public override async Task StartAsync(CancellationToken cancellationToken)
        {
            var factory = new ConnectionFactory()
            {
                HostName = _configuration["RabbitMQ:Host"],
                UserName = _configuration["RabbitMQ:Username"],
                Password = _configuration["RabbitMQ:Password"],
            };

            _connection = await factory.CreateConnectionAsync();
            _channel = await _connection.CreateChannelAsync();

            await _channel.QueueDeclareAsync(queue: _queueName, durable: true, exclusive: false, autoDelete: false, arguments: null);

            var consumer = new AsyncEventingBasicConsumer(_channel);
            consumer.ReceivedAsync += async (model, ea) =>
            {
                var message = Encoding.UTF8.GetString(ea.Body.ToArray());
                await ProcessFirebaseNotification(message);
            };
            await _channel.BasicConsumeAsync(queue: _queueName, autoAck: true, consumer: consumer);
        }

        private async Task ProcessFirebaseNotification(string message)
        {
            using (var scope = _serviceScopeFactory.CreateScope())
            {
                var firebaseService = scope.ServiceProvider.GetRequiredService<IFirebaseService>();
                await firebaseService.ProcessMessage(message);
            }
        }

        public override async Task StopAsync(CancellationToken cancellationToken)
        {
            if (_connection != null)
                await _connection.CloseAsync();

            if (_channel != null)
                await _channel.CloseAsync();
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            return Task.CompletedTask;
        }
    }
}
