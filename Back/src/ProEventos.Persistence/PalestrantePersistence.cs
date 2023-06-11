using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contextos;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence
{
    public class PalestrantePersistence : IPalestrantePersistence
    {
        private readonly ProEventosContext _context;

        public PalestrantePersistence(ProEventosContext context)
        {
            _context = context;
        }

        private IQueryable<Palestrante> GetPalestrantesQuery(bool includeEventos)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                .Include(p => p.RedesSociais);

            if (includeEventos)
            {
                query = query.AsNoTracking()
                             .Include(p => p.PalestrantesEventos)
                             .ThenInclude(pe => pe.Evento);
            }

            return query;
        }

        public async Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos = false)
        {
            IQueryable<Palestrante> query = GetPalestrantesQuery(includeEventos);
            return await query.AsNoTracking()
                              .OrderBy(p => p.Id).ToArrayAsync();
        }

        public async Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos = false)
        {
            IQueryable<Palestrante> query = GetPalestrantesQuery(includeEventos);
            return await query.AsNoTracking()
                              .Where(p => p.Nome.ToLower().Contains(nome.ToLower()))
                              .OrderBy(p => p.Id)
                              .ToArrayAsync();
        }

        public async Task<Palestrante> GetPalestranteByIdAsync(int palestranteId, bool includeEventos = false)
        {
            IQueryable<Palestrante> query = GetPalestrantesQuery(includeEventos);
            return await query.AsNoTracking()
                              .Where(p => p.Id == palestranteId)
                              .OrderBy(p => p.Id)
                              .FirstOrDefaultAsync();
        }
    }
}
