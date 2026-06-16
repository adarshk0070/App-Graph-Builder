import { useState } from 'react';
import { useApps } from '@/hooks/useApps';
import { useAppStore } from '@/store/appStore';
import { Search, Plus, ChevronRight } from 'lucide-react';

export function AppList() {
  const [search, setSearch] = useState('');
  const { data: apps, isLoading, isError } = useApps();
  const { selectedAppId, setSelectedAppId } = useAppStore();

  const filteredApps = apps?.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-list-section">
      <div className="app-list-header">
        <span className="app-list-title">Applications</span>
      </div>

      <div className="app-search-row">
        <div style={{ position: 'relative', flex: 1 }}>
          <Search
            size={14}
            style={{
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-muted-foreground)',
              pointerEvents: 'none',
            }}
          />
          <input
            className="app-search-input"
            style={{ paddingLeft: 30 }}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="app-search"
          />
        </div>
        <button className="app-add-btn" aria-label="Add application">
          <Plus size={16} />
        </button>
      </div>

      <div className="app-list-items">
        {isLoading && (
          <>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="loading-skeleton"
                style={{ height: 40, marginBottom: 6 }}
              />
            ))}
          </>
        )}

        {isError && (
          <div style={{ padding: 16, fontSize: 12, color: 'var(--color-muted-foreground)' }}>
            Failed to load applications
          </div>
        )}

        {filteredApps?.map((app) => (
          <div
            key={app.id}
            className={`app-list-item ${selectedAppId === app.id ? 'selected' : ''}`}
            onClick={() => setSelectedAppId(app.id)}
            role="button"
            tabIndex={0}
            id={`app-item-${app.id}`}
          >
            <div className="app-list-item-icon">{app.icon}</div>
            <span className="app-list-item-name">{app.name}</span>
            <ChevronRight size={14} className="app-list-item-chevron" />
          </div>
        ))}

        {filteredApps && filteredApps.length === 0 && (
          <div style={{ padding: 16, fontSize: 12, color: 'var(--color-muted-foreground)', textAlign: 'center' }}>
            No applications found
          </div>
        )}
      </div>
    </div>
  );
}
