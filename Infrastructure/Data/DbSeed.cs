using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class DbSeed
    {
        public static async Task SeedAsync(Db db, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!db.ProductBrands.Any())
                {
                    var productBrandsData =
                        await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/brands.json");

                    var productBrands = JsonSerializer.Deserialize<List<ProductBrand>>(productBrandsData);

                    foreach (var productBrand in productBrands) db.ProductBrands.Add(productBrand);

                    await db.SaveChangesAsync();
                }

                if (!db.ProductTypes.Any())
                {
                    var productTypesData =
                        await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/types.json");

                    var productTypes = JsonSerializer.Deserialize<List<ProductType>>(productTypesData);

                    foreach (var productType in productTypes) db.ProductTypes.Add(productType);

                    await db.SaveChangesAsync();
                }

                if (!db.Products.Any())
                {
                    var productsData =
                        await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/products.json");

                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);

                    foreach (var product in products) db.Products.Add(product);

                    await db.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<DbSeed>();
                logger.LogError(ex.Message);
            }
        }

        public static async Task SeedUsersAsync(UserManager<IdentityUserExtend> userManager,Db db)
        {
            if (!userManager.Users.Any())
            {
                var user = new IdentityUserExtend()
                {
                    UserName = "KareemReda85@gmail.com",
                    Email = "KareemReda85@gmail.com",
                    Address = new Address
                    {
                        FirstName = "kareem",
                        LastName = "Azam",
                        Street = "2st El-Jaffary",
                        City = "Maadi",
                        State = "Cairo",
                        Zip = "12345"
                    },
                    IdentityUserProfile = new IdentityUserProfile()
                    {
                        FirstName = "Kareem",
                        LastName = "Azam",
                        DisplayName = "Kareem Azam"
                    }
                };
                
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}