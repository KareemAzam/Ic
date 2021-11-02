using Core.Entities;

namespace Core.Specifications
{
    public class ProductsAndTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsAndTypesAndBrandsSpecification(ProductSpecParams productParams)
            : base(x =>
                (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
                (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
            )
        {
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductType);
            AddOrderby(x => x.Name);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);

            if (!string.IsNullOrEmpty(productParams.Sort))
                switch (productParams.Sort)
                {
                    case "priceAsc":
                        AddOrderby(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;
                    default:
                        AddOrderby(n => n.Name);
                        break;
                }
        }

        public ProductsAndTypesAndBrandsSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductType);
        }
    }
}