using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Doorway.Core.DAL;

namespace Doorway.Core.BLL {
    public static class UserExtensions {

        public static IQueryable<User> GetAll(this DbSet<User> users) {
            return users.Select(u => u);
        }

        public static IQueryable<User> GetAllActive(this DbSet<User> users) {
            return users.GetAll().Where(c => (c.DeletedOn == null));
        }

        public static IQueryable<User> ById(this DbSet<User> users, int id) {
            return users.GetAll().Where(u => u.Id == id);
        }

        public static IQueryable<User> ByLogin(this DbSet<User> users, string login) {
            return users.GetAll().Where(u => string.Compare(u.Login, login, false) == 0);
        }

        public static User AddNew(this DbSet<User> users, string login, string name, DateTime created) {
            User newUser = new User() {
                Login = login,
                Name = name,
                CreatedOn = created
            };
            users.Add(newUser);
            return newUser;
        }

        public static User AddNew(this DbSet<User> users, string login, string name) {
            return users.AddNew(login, name, DateTime.UtcNow);
        }

        public static bool Delete(this DbSet<User> users, int id, DateTime deleted) {
            bool result = false;
            User usr = users.ById(id).FirstOrDefault();
            if (usr != null) {
                usr.DeletedOn = deleted;
                return true;
            }
            return result;
        }

        public static bool Delete(this DbSet<User> users, int id) {
            return users.Delete(id, DateTime.UtcNow);
        }
    }
}
