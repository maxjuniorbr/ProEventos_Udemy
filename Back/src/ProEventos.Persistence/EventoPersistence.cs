using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contextos;
using ProEventos.Persistence.Contratos;
using System.Linq;
using System.Threading.Tasks;

namespace ProEventos.Persistence
{
    public class EventoPersistence : IEventoPersistence
    {
        private readonly ProEventosContext _context;

        public EventoPersistence(ProEventosContext context)
        {
            _context = context;
        }

        private IQueryable<Evento> GetEventosQuery(bool includePalestrantes)
        {
            IQueryable<Evento> query = _context.Eventos
                .Include(e => e.Lotes)
                .Include(e => e.RedesSociais);

            if (includePalestrantes)
            {
                query = query.AsNoTracking()
                             .Include(e => e.PalestrantesEventos)
                             .ThenInclude(pe => pe.Palestrante);
            }

            return query;
        }

        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false)
        {
            IQueryable<Evento> query = GetEventosQuery(includePalestrantes);
            return await query.AsNoTracking()
                              .OrderBy(e => e.Id).ToArrayAsync();
        }

        public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = GetEventosQuery(includePalestrantes);
            return await query.AsNoTracking()
                              .Where(e => e.Tema.ToLower().Contains(tema.ToLower()))
                              .OrderBy(e => e.Id)
                              .ToArrayAsync();
        }

        public async Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = GetEventosQuery(includePalestrantes);
            return await query.AsNoTracking()
                              .Where(e => e.Id == eventoId)
                              .OrderBy(e => e.Id)
                              .FirstOrDefaultAsync();
        }
    }
}
