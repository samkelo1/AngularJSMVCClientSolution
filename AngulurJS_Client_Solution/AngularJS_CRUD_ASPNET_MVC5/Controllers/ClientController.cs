using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AngularJS_CRUD_ASPNET_MVC5.Models;

namespace AngularJS_CRUD_ASPNET_MVC5.Controllers
{
    public class ClientController : Controller
    {
        // GET Client/GetClient
        [HttpGet]
        public JsonResult GetClient()
        {
            using (ClientDetailsEntities db = new ClientDetailsEntities())
            {
                List<Client> clientList = db.Clients.ToList();
                return Json(clientList, JsonRequestBehavior.AllowGet);
            }

        }

        //POST client/AddClient  
        [HttpPost]
        public JsonResult Insert(Client client)
        {
            if (client != null)
            {
                using (ClientDetailsEntities db = new ClientDetailsEntities())
                {
                    db.Clients.Add(client);
                    db.SaveChanges();
                    return Json(new { success = true });
                }
            }
            else
            {
                return Json(new { success = false });
            }
        }


        //POST Client/Update     
        [HttpPost]
        public JsonResult Update(Client updatedClient)
        {
            using (ClientDetailsEntities db = new ClientDetailsEntities())
            {
                Client existingClient = db.Clients.Find(updatedClient.Id);
                if (existingClient == null)
                {
                    return Json(new { success = false });
                }
                else
                {
                    existingClient.Surname = updatedClient.Surname;
                    existingClient.FirstName = updatedClient.FirstName;
                    existingClient.IdentityType = updatedClient.IdentityType;
                    existingClient.IdentityNumber = updatedClient.IdentityNumber;
                    existingClient.DateOfBirth = updatedClient.DateOfBirth;
                    db.SaveChanges();
                    return Json(new { success = true });
                }
            }
        }

        //POST Client/Delete/1
        [HttpPost]
        public JsonResult Delete(int Id)
        {
            using (ClientDetailsEntities db = new ClientDetailsEntities())
            {
                Client client = db.Clients.Find(Id);
                if (client == null)
                {
                    return Json(new { success = false });
                }
                db.Clients.Remove(client);
                db.SaveChanges();
                return Json(new { success = true });
            }

        }
    }
}