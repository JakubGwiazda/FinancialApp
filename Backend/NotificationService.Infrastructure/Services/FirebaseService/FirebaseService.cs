using FirebaseAdmin.Messaging;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NotificationService.Infrastructure.Context;
using NotificationService.Infrastructure.Models;

namespace NotificationService.Infrastructure.Services.FirebaseService
{
    public interface IFirebaseService
    {
        Task ProcessMessage(string message);
    }

    public class FirebaseService : IFirebaseService
    {
        private BaseContext _context;
        public FirebaseService(BaseContext context)
        {
            _context = context;
        }

        public async Task ProcessMessage(string message)
        {
            var messageToSend = JsonConvert.DeserializeObject<MessageRequest>(message);
            await SendNotificationAsync(messageToSend);
        }

        private async Task SendNotificationAsync(MessageRequest mr)
        {
            try
            {
                var tokens = await _context.RegisteredDevices.ToListAsync();

                foreach (var token in tokens)
                {
                    var message = new Message()
                    {
                        Token = token.Token,
                        Notification = new Notification()
                        {
                            Title = mr.Title,
                            Body = mr.Body,
                        }
                    };

                    await FirebaseMessaging.DefaultInstance.SendAsync(message);
                }
            }
            catch (Exception ex) {
                var a = ex;
            }
            
        }
    }
}
