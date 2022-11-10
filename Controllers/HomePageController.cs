using Microsoft.AspNetCore.Mvc;

namespace BlogSite.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomePageController
    {

        [HttpGet("Index")]
        public string Index()
        {
            return "Sedat Öztürk";
        }
    }
}
//
