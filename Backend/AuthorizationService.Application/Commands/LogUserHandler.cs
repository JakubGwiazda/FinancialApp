using AuthorizationService.Application.Interfaces;
using AuthorizationService.Domain;
using FluentResults;
using MediatR;

namespace AuthorizationService.Application.Commands
{
    public class LogUserResponse
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }

    public class LogUserCmd : IRequest<Result<LogUserResponse>>
    {
        public string User { get; set; }
        public string Password { get; set; }
    }

    internal class LogUserHandler : IRequestHandler<LogUserCmd, Result<LogUserResponse>>
    {
        private IUserRepository _userRepository;
        private ITokenGenerator _tokenGenerator;
        private IPasswordManager _passwordManager;

        public LogUserHandler(IUserRepository userRepository, ITokenGenerator tokenGenerator, IPasswordManager passwordManager)
        {
            _userRepository = userRepository;
            _passwordManager = passwordManager;
            _tokenGenerator = tokenGenerator;
        }

        public async Task<Result<LogUserResponse>> Handle(LogUserCmd request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetRecord<Users>(p => p.User == request.User);

            if (user == null)
            {
                return Result.Fail("Wrong user name or password");
            }

            var passwordCorrect = _passwordManager.CheckPassword(request.Password, user.Password);

            if (passwordCorrect)
            {
                var token = _tokenGenerator.GenerateJwtToken(user.User);
                var refreshToken = _tokenGenerator.GenerateJwtRefreshToken(user.User);
                user.RefreshToken = refreshToken.refreshToken;
                user.RefreshTokenExpirationDate = refreshToken.expirationDate;

                await _userRepository.SaveChangesAsync();

                return Result.Ok(new LogUserResponse() { Token = token.token, RefreshToken = refreshToken.refreshToken });
            }

            return Result.Fail("Wrong user name or password");
        }
    }
}
