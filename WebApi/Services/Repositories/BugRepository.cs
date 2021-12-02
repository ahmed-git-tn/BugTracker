using BugTracker.Data;
using BugTracker.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BugTracker.Services
{
    public class BugRepository: IBugRepository
    {
        private readonly BugTrackerDbContext _bugTrackerContext;

        public BugRepository(BugTrackerDbContext bugTrackerContext)
        {
            _bugTrackerContext = bugTrackerContext;
        }


        public async Task<IEnumerable<Bug>> GetBugs()
        {

            return await _bugTrackerContext.Bugs.ToArrayAsync();

        }
        public async Task<Bug> AddBugByUser(string userId, Bug bug)
        {
            bug.ApplicationUserId = userId;
            await _bugTrackerContext.Bugs.AddAsync(bug);
            await _bugTrackerContext.SaveChangesAsync();
            return bug;

        }
        public async Task<Bug> GetBugById(int id)
        {
            return await _bugTrackerContext.Bugs.FirstOrDefaultAsync(p => p.Id == id);

        }
        public async Task<bool> UpdateBug(int id , Bug bug)
        {
            bool isUpdated;
            var existingBug = await GetBugById(id);
            if (existingBug == null)
            {
                isUpdated = false;
                return isUpdated;
            }
           
            existingBug.Title = bug.Title;
            existingBug.Description = bug.Description;
            existingBug.State = bug.State;
            existingBug.Priority = bug.Priority;
            _bugTrackerContext.Update(existingBug);
            _bugTrackerContext.SaveChanges();
            isUpdated = true;
            return isUpdated;

        }
        public async Task<bool> DeleteBugById(int id)
        {
            bool isDeleted ;
            var existingBug = await _bugTrackerContext.Bugs.FirstOrDefaultAsync(p => p.Id == id);
            if(existingBug == null)
            {
                return isDeleted = false;
            }
            _bugTrackerContext.Bugs.Remove(existingBug);
            await _bugTrackerContext.SaveChangesAsync();
            isDeleted = true;
            return isDeleted;
        }

        public async Task<IEnumerable<Bug>> GetBugsByUserId(string userId)
        {
            var res = await  _bugTrackerContext.Bugs.Where(b => b.ApplicationUserId == userId).ToArrayAsync();
            return res;
        }
    }
}
