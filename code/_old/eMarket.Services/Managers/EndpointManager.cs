/*---------------------------------------------------------------------------------------------
 *   Licensed to the Knowledge Reuse Group under one or more agreements.
 *
 *  The KR Group licenses this file to you under the MIT license.
 *  See the LICENSE file in the project root for more information.
 *  Written by Francisco J. Rodriguez <francisco.rodriguez@reusecompany.com> 
 *  & Miguel A. Rozalen <miguel.rozalen@reusecompany.com>
 *  & Alvaro Aranda <alvaro.aranda@reusecompany.com>
 *  March 2019
 *--------------------------------------------------------------------------------------------*/
namespace Doorway.Services.Managers {

    /// <summary>
    /// Endpoint Manager
    /// </summary>
    public class EndpointManager {

        #region Constants

        // Endpoints
        public const string Endpoints = "endpoints";

        // User Controller Endpoints
        public const string GetOrCreateUserByLogin = "getOrCreateUserByLogin";
        public const string GetUserById = "getUserById";
        public const string GetAllUsers = "getAllUsers";
        public const string UpdateUserImage = "updateUserImage";

        // Event Controller Endpoints
        public const string AddEvent = "addEvent";
        public const string UpdateEvent = "updateEvent";
        public const string DeleteEvent = "deleteEvent";
        public const string GetUserEvents = "getUserEvents";
        public const string SetEvent = "setEvent";
        public const string GetCompanyTimeline = "getCompanyTimeline";
        public const string GetEmployeeOfTheMonth = "getEmployeeOfTheMonth";
        public const string GetActualStatus = "getActualStatus";
        public const string GetAllUserEvents = "getAllUserEvents";
        public const string GetAllUserOptions = "getAllOptions";
        public const string GetUserLevelAccess = "getUserLevelAccess";
        
        public const string SetUserOption = "setUserOption";
        // Category Controller Endpoints
        public const string GetCategories = "getCategories";

        // Session Controller Endpoints
        public const string URI_WINDOWS_AUTENTICATION = "windowsAuthentication";

        // Bing Controller
        public const string URI_BING_WALLPAPER = "bingWallpaper";

        #endregion

    }
}
