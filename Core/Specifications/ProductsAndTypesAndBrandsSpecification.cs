using Core.Entities;

namespace Core.Specifications
{
    public class ProductsAndTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsAndTypesAndBrandsSpecification()
        {
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductType);
        }

        public ProductsAndTypesAndBrandsSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductType);
        }
    }
}