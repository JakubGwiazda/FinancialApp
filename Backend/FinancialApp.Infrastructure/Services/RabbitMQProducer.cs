using Microsoft.Extensions.Configuration;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinancialApp.Infrastructure.Services
{
    internal interface IRabbitMQProducer
    {
        void PublishNotification(string message);
    }

    internal class RabbitMQProducer : IRabbitMQProducer
    {
        private IConnection _connection;
        private IChannel _channel;
        private string _queueName;

        private  RabbitMQProducer()
        {
        }

        public static async Task<RabbitMQProducer> CreateAsync(IConfiguration configuration)
        {
            var instance = new RabbitMQProducer();
            var factory = new ConnectionFactory()
            {
                HostName = configuration["RabbitMQ:Host"],
                UserName = configuration["RabbitMQ:Username"],
                Password = configuration["RabbitMQ:Password"],
            };
            instance._queueName = configuration["RabbitMQ:QueueName"];
            instance._connection = await factory.CreateConnectionAsync();
            instance._channel = await instance._connection.CreateChannelAsync();
            await instance._channel.QueueDeclareAsync(
                queue: instance._queueName,
                durable: true,
                exclusive: false,
                autoDelete: false,
                arguments: null);

            return instance;
        }

        public async void PublishNotification(string message)
        {           
            var body = Encoding.UTF8.GetBytes(message);

            await _channel.BasicPublishAsync(
                exchange: "",
                routingKey: _queueName,
                mandatory: false,
                body: body);
        }
    }
}
