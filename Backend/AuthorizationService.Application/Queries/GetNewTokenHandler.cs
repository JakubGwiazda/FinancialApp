using AuthorizationService.Application.Interfaces;
using AuthorizationService.Application.Services;
using AuthorizationService.Domain;
using FluentResults;
using MediatR;
using Microsoft.Extensions.Configuration;

namespace AuthorizationService.Application.Queries
{
    public class GetNewTokenCmd : IRequest<Result<string>>
    {
        public int UserId { get; set; }
    }

    public class GetNewTokenHandler : IRequestHandler<GetNewTokenCmd, Result<string>>
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;
        private readonly ITokenGenerator _tokenGenerator;

        public GetNewTokenHandler(IConfiguration configuration, IUserRepository userRepository, ITokenGenerator tokenGenerator)
        {
            _configuration = configuration;
            _userRepository = userRepository;
            _tokenGenerator = tokenGenerator;
        }

        public async Task<Result<string>> Handle(GetNewTokenCmd request, CancellationToken cancellationToken)
        {
            var tokenService = new JwtTokenGenerator(_configuration);
            var user = await _userRepository.GetRecord<Users>(p => p.Id == request.UserId);
            var token = _tokenGenerator.GenerateJwtToken(user.User);

            user.Token = token.token;
            user.TokenExpirationDate = token.expirationDate;
            await _userRepository.SaveChangesAsync();

            return Result.Ok(token.token);
        }
    }
}
