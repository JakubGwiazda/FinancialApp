using AuthorizationService.Application.Interfaces;
using AuthorizationService.Domain;
using FluentResults;
using MediatR;
using Microsoft.Extensions.Configuration;

namespace AuthorizationService.Application.Queries
{
    public class GetNewTokenCmd : IRequest<Result<string>>
    {
        public string User { get; set; }
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
            var user = await _userRepository.GetRecord<Users>(p => p.User == request.User);
            var token = _tokenGenerator.GenerateJwtToken(user.User);

            return Result.Ok(token.token);
        }
    }
}
