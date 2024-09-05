using API.Entities;

namespace API.Interface {
    public interface ITokenService {
        
        string CreateToken(Students students);
        string CreateToken(Wardens wardens);
        string CreateToken(Guards guards);
        string CreateToken(Admin admin);
    }
}