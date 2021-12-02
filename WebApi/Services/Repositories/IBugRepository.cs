using BugTracker.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BugTracker.Services
{
    public interface IBugRepository
    {
        Task<IEnumerable<Bug>> GetBugs();
        Task<IEnumerable<Bug>> GetBugsByUserId(string userId);
        Task<Bug> AddBugByUser(string userId,Bug Bug);
        Task<Bug> GetBugById(int id);
        Task<bool> UpdateBug(int id, Bug newBug);
        Task<bool> DeleteBugById(int id);
    }
}
