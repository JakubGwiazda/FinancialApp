﻿using System.ComponentModel.DataAnnotations.Schema;

namespace NotificationService.Domain
{
    [Table("RegisteredDevices")]
    public class RegisteredDevices
    {
        public int Id { get; set; }
        public string Token { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
