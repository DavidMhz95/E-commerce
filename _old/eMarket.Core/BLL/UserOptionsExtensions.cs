using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Doorway.Core.DAL;

namespace Doorway.Core.BLL {
    public static class UserOptionsExtensions {

        public static IQueryable<UserOption> GetAll(this DbSet<UserOption> userOptions) {
            return userOptions.Select(u => u);
        }

        public static IQueryable<UserOption> ById(this DbSet<UserOption> userOptions, int id) {
            return userOptions.GetAll().Where(u => u.Id == id);
        }

        public static IQueryable<UserOption> ByUser(this DbSet<UserOption> userOptions, int userId) {
            return userOptions.GetAll().Where(u => u.UserId == userId);
        }

        public static UserOption AddNew(this DbSet<UserOption> userOptions, int userId, string name, string value, DateTime created) {
            UserOption newUserOption = new UserOption() {
                UserId = userId,
                Name = name,
                Value = value,
                CreatedOn = created
            };
            userOptions.Add(newUserOption);
            return newUserOption;
        }

        public static UserOption AddNew(this DbSet<UserOption> userOptions, int userId, string name, string value) {
            return userOptions.AddNew(userId, name, value, DateTime.UtcNow);
        }

        public static bool Update(this DbSet<UserOption> userOptions, int id, string value, DateTime updated) {

            bool result = false;
            UserOption opt = userOptions.ById(id).FirstOrDefault();
            if (opt != null) {
                opt.Value = value;
                opt.UpdatedOn = updated;
                return true;
            }
            return result;
        }

        public static bool Update(this DbSet<UserOption> userOptions, int id, string value) {
            return userOptions.Update(id, value, DateTime.UtcNow);
        }

        public static bool Delete(this DbSet<UserOption> userOptions, int id, DateTime deleted) {
            bool result = false;
            UserOption userOption = userOptions.ById(id).FirstOrDefault();
            if (userOption != null) {
                userOption.DeletedOn = deleted;
                return true;
            }
            return result;
        }

        public static bool Delete(this DbSet<UserOption> userOptionss, int id) {
            return userOptionss.Delete(id, DateTime.UtcNow);
        }
    }
}
