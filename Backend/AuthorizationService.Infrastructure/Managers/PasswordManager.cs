using AuthorizationService.Application.Interfaces;
using Isopoh.Cryptography.Argon2;
using Isopoh.Cryptography.SecureArray;
using System.Security.Cryptography;
using System.Text;

namespace AuthorizationService.Infrastructure.Managers
{
    public class PasswordManager : IPasswordManager
    {
        public string HashPassword(string password)
        {
            string hashString;

            var config = new Argon2Config
            {
                Type = Argon2Type.DataIndependentAddressing,
                Version = Argon2Version.Nineteen,
                TimeCost = 2,          
                MemoryCost = 1 << 14,
                Lanes = 2,            
                Threads = 2,
                Salt = RandomNumberGenerator.GetBytes(16),
                HashLength = 32,
                Password = Encoding.UTF8.GetBytes(password)
            };
            
            var argon = new Argon2(config);

            using (SecureArray<byte> hash = argon.Hash())
            {
                hashString = $"{Convert.ToBase64String(config.Salt)}${config.EncodeString(hash.Buffer)}";
            }

            return hashString;
        }

        public bool CheckPassword(string passwordToCheck, string storedPassword)
        {
            string[] parts = storedPassword.Split('$', 2);
            byte[] storedSalt = Convert.FromBase64String(parts[0]);
            string storedHash = parts[1];
            string givenPasswordHash;

            var config = new Argon2Config
            {
                Type = Argon2Type.DataIndependentAddressing,
                Version = Argon2Version.Nineteen,
                TimeCost = 2,
                MemoryCost = 1 << 14,
                Lanes = 2,
                Threads = 2,
                Salt = storedSalt, 
                HashLength = 32,
                Password = Encoding.UTF8.GetBytes(passwordToCheck)                
            };

            var argon = new Argon2(config);

            using (SecureArray<byte> hash = argon.Hash())
            {
                givenPasswordHash = config.EncodeString(hash.Buffer);                
            }

            return Argon2.Verify(givenPasswordHash, passwordToCheck);
        }

    }
}
