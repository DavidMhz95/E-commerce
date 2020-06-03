using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Doorway.Core.DAL;

namespace Doorway.Core.BLL {
    public static class EventExtensions {

        public static IQueryable<Event> GetAll(this DbSet<Event> events) {
            return events.Select(u => u);
        }

        public static IQueryable<Event> GetAllActive(this DbSet<Event> events) {
            return events.GetAll().Where(c => (c.DeletedOn == null));
        }

        public static IQueryable<Event> GetAllActiveFromUser(this DbSet<Event> events, int userId) {
            return events.GetAll().Where(c => (c.DeletedOn == null && c.UserId == userId));
        }

        public static IQueryable<Event> GetAllOpenFromUser(this DbSet<Event> events, int userId) {
            return events.GetAll().Where(c => (c.DeletedOn == null && c.UserId == userId && c.EndAt == null));
        }

        public static IQueryable<Event> ById(this DbSet<Event> events, int id) {
            return events.GetAll().Where(u => u.Id == id);
        }

       // public static IQueryable<Event> ByLogin(this DbSet<Event> events, string login) {
            //return events.GetAllActive().Include(e => e.User).Where(e => string.Compare(e.User.Login, login, true) == 0);
      //  }

        //public static IQueryable<Event> ByLoginAndDay(this DbSet<Event> events, string login, DateTime day) {

           // return events.ByLogin(login).Where(e => e.StartAt.ToShortDateString() == day.ToShortDateString());
        //}

        public static Event AddNew(this DbSet<Event> events, int usrId, Category cat, DateTime startAt, DateTime? endAt, string comment, DateTime created) {

            Event newEvent = new Event() {
                StartAt = startAt,
                EndAt = endAt,
                Comments = comment,
                UserId = usrId,
                Category = cat,
                CreatedOn = created
            };
            events.Add(newEvent);
            return newEvent;
        }

        public static bool Delete(this DbSet<Event> events, int id, DateTime deleted) {

            bool result = false;
            Event evt = events.ById(id).FirstOrDefault();
            if (evt != null) {
                evt.DeletedOn = deleted;
                return true;
            }
            return result;
        }

        public static bool Delete(this DbSet<Event> events, int id) {
            return events.Delete(id, DateTime.UtcNow);
        }

        public static bool Update(this DbSet<Event> events, int id, Category cat, DateTime startAt, DateTime? endAt, string comment, DateTime updated) {

            bool result = false;
            Event evt = events.ById(id).FirstOrDefault();
            if (evt != null) {
                evt.Category = cat;
                evt.StartAt = startAt;
                evt.EndAt = endAt;
                evt.Comments = comment;
                evt.UpdatedOn = updated;
                return true;
            }
            return result;
        }

        public static bool Update(this DbSet<Event> events, int id, Category cat, DateTime startAt, DateTime? endAt, string comment) {
            return events.Update(id, cat, startAt, endAt, comment, DateTime.UtcNow); 
        }


        public static void FinishEvent(this DbSet<Event> events, int id, DateTime date) {
            Event evt = events.ById(id).FirstOrDefault();
            if (evt != null) {
                evt.EndAt = date;
            }
        }
    }
}
