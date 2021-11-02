using Core.Entities;

namespace Core.Specifications
{
    public class ProductsAndTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsAndTypesAndBrandsSpecification(string sort, int? brandId, int? typeId)
            : base(x =>
                (!brandId.HasValue || x.ProductBrandId == brandId) &&
                (!typeId.HasValue || x.ProductTypeId == typeId)
            )
        {
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductType);
            AddOrderby(x => x.Name);

            if (!string.IsNullOrEmpty(sort))
                switch (sort)
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