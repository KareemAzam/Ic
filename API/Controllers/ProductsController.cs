using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly Db _db;

        public ProductsController(Db db)
        {
            _db = db;
        }

        // GET: api/<Products>
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _db.Products.ToListAsync();
            return Ok(products);
        }

        // GET api/<Products>/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await _db.Products.FindAsync(id);
        }

        // POST api/<Products>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<Products>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Products>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}