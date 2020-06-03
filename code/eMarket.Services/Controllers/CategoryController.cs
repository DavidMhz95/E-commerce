using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Doorway.Core.BLL;
using Doorway.Core.DAL;
using Doorway.Services.Managers;
using Microsoft.AspNetCore.Mvc;

namespace Doorway.Services.Controllers
{
    public class CategoryController : Controller
    {
        /// <summary>
        /// Get or create user from database
        /// </summary>
        /// <returns>All categories list</returns>
        [HttpGet]
        [Route(EndpointManager.GetCategories)]
        public ObjectResult GetCategories() {

            // Variable to return the result
            ObjectResult objectResult = null;

            // Set the connection to the database
            DoorwayEntities db = new DoorwayEntities(ServiceSettingsManager.Instance.DbHost, ServiceSettingsManager.Instance.DbName, ServiceSettingsManager.Instance.DbUser, ServiceSettingsManager.Instance.DbPass);

            try {
                // Get first result of the query
                List<Category> categories = db.Categories.GetAllActive().ToList();

                // Prepare results
                objectResult = this.StatusCode((int)System.Net.HttpStatusCode.OK, categories);
            } catch (Exception exception) {
                objectResult = this.StatusCode((int)System.Net.HttpStatusCode.InternalServerError, exception.Message);
            }

            // Close the connection
            db.Close();
            db = null;

            // Return result
            return objectResult;
        }
    }
}