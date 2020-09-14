using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Doorway.Core.DAL;

namespace Doorway.Core.BLL {
    public static class CategoryExtensions {

        public static IQueryable<Category> GetAll(this DbSet<Category> categories) {
            return categories.Select(u => u);
        }

        public static IQueryable<Category> GetAllActive(this DbSet<Category> categories) {
            return categories.GetAll().Where(c => (c.DeletedOn == null));
        }

        public static IQueryable<Category> ById(this DbSet<Category> categories, int id) {
            return categories.GetAll().Where(u => u.Id == id);
        }

        public static IQueryable<Category> ByName(this DbSet<Category> categories, string name) {
            return categories.GetAll().Where(u => u.Name == name);
        }

        public static Category AddNew(this DbSet<Category> categories, string name, byte? contributeToWorktime, string color, DateTime created) {
            Category newCategory = new Category {
                Name = name,
                Color = color,
                ContributeToWorktime = contributeToWorktime,
                CreatedOn = created
            };
            categories.Add(newCategory);
            return newCategory;
        }

        public static Category AddNew(this DbSet<Category> categories, string name, byte? contributeToWorktime, string color) {
            return categories.AddNew(name, contributeToWorktime, color, DateTime.UtcNow);
        }

        public static bool Delete(this DbSet<Category> categories, int id, DateTime deleted) {
            bool result = false;
            var catToDelete = categories.ById(id).FirstOrDefault();
            if (catToDelete != null) {
                catToDelete.DeletedOn = deleted;
                result = true;
            }
            return result;
        }

        public static bool Delete(this DbSet<Category> categories, int id) {
            return categories.Delete(id, DateTime.UtcNow);
        }

        public static bool Update(this DbSet<Category> categories, int id, string name, string color, byte? contributeToWorktime, DateTime updated) {

            bool result = false;
            Category cat = categories.ById(id).FirstOrDefault();
            if (cat != null) {
                cat.Name = name;
                cat.Color = color;
                cat.ContributeToWorktime = contributeToWorktime;
                cat.UpdatedOn = updated;
            }
            return result;
        }

        public static bool Update(this DbSet<Category> categories, int id, string name, string color, byte? contributeToWorktime) {
            return categories.Update(id, name, color, contributeToWorktime, DateTime.UtcNow);
        }
    }
}
