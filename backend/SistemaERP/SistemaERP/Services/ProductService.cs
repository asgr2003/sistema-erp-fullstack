using SistemaERP.Models;
using SistemaERP.Repositories;

namespace SistemaERP.Services
{
    public class ProductService
    {
        private readonly ProductRepository _repository;

        public ProductService(ProductRepository repository)
        {
            _repository = repository;
        }

        public Task<List<Product>> GetAll() => _repository.GetAll();

        public Task<Product?> GetById(int id) => _repository.GetById(id);

        public Task Add(Product product) => _repository.Add(product);

        public Task Update(Product product) => _repository.Update(product);

        public Task Delete(int id)
        {
            return _repository.Delete(id);
        }
    }
}