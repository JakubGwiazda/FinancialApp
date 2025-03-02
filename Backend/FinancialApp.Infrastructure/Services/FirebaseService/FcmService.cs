using FinancialApp.Application.Interfaces;
using FinancialApp.Domain;
using FirebaseAdmin.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinancialApp.Infrastructure.Services.FirebaseService
{

    public interface IFcmService
    {
        Task SendNotificationAsync(string title, string body);
    }
    public class FcmService : IFcmService
    {
        private IRegisteredDevicesRepository _repository;
        public FcmService(IRegisteredDevicesRepository repository)
        {
            _repository = repository;
        }
        public async Task SendNotificationAsync(string title, string body)
        {
            var tokens = await _repository.GetAllRecords<RegisteredDevices>();


            foreach (var token in tokens)
            {
                var message = new Message()
                {
                    Token = token.Token,
                    Notification = new Notification()
                    {
                        Title = title,
                        Body = body
                    }
                };

                 await FirebaseMessaging.DefaultInstance.SendAsync(message);
            }
        }
    }
}
