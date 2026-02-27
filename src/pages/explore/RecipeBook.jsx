import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { recipes } from '../../data/mockData';
import PageShell from '../../components/ui/PageShell';
import Card from '../../components/ui/Card';
import { ArrowLeft, Search, Clock, ChevronDown, ChevronUp, Bookmark, Fish, Soup, CupSoda, Sandwich, Wheat } from 'lucide-react';
import ReturnCapsules from '../../components/ui/ReturnCapsules';

const recipeIcons = {
  fish: { Icon: Fish, color: '#0097A7', bg: '#CCF0F6' },
  soup: { Icon: Soup, color: '#E65100', bg: '#FFF3E0' },
  smoothie: { Icon: CupSoda, color: '#7B1FA2', bg: '#F3E5F5' },
  wrap: { Icon: Sandwich, color: '#2E7D32', bg: '#E8F5E9' },
  bowl: { Icon: Wheat, color: '#F57F17', bg: '#FFF8E1' },
};

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function RecipeBook() {
  const navigate = useNavigate();
  const { savedRecipes, toggleSavedRecipe } = useApp();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const sectionRefs = useRef({});

  // Get saved recipe objects, sorted alphabetically
  const saved = recipes
    .filter(r => savedRecipes.includes(r.id))
    .filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  // Group by first letter
  const grouped = {};
  saved.forEach(r => {
    const letter = r.name[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(r);
  });

  const activeLetters = Object.keys(grouped);

  const scrollToLetter = (letter) => {
    const el = sectionRefs.current[letter];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <PageShell>
      <button onClick={() => navigate('/explore/nutrition')} className="flex items-center gap-2 mb-4 min-h-[48px]" style={{ color: 'var(--color-teal)' }}>
        <ArrowLeft size={20} /> Back to Nutrition
      </button>
      <h1 className="font-semibold mb-1" style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-heading)' }}>My Recipe Book</h1>
      <p className="mb-4" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
        {saved.length === 0 && !search ? 'Save recipes from the Nutrition page to build your collection!' : `${saved.length} recipe${saved.length === 1 ? '' : 's'}`}
      </p>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
        <input
          type="text"
          placeholder="Search your saved recipes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-xl pl-10 pr-4 py-3 min-h-[48px]"
          style={{ backgroundColor: 'var(--color-card)', fontSize: 'var(--font-size-sm)', border: 'none', outline: 'none', color: 'var(--color-text)', boxShadow: '0 1px 3px var(--color-shadow)' }}
        />
      </div>

      {saved.length === 0 && search && (
        <p className="text-center py-8" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-muted)' }}>
          No saved recipes match your search.
        </p>
      )}

      {saved.length === 0 && !search && (
        <div className="text-center py-8">
          <Bookmark size={40} style={{ color: 'var(--color-surface-muted)', margin: '0 auto 12px' }} />
          <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-muted)' }}>
            Your recipe book is empty!
          </p>
          <p className="mt-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            Tap the bookmark icon on any recipe to save it here.
          </p>
        </div>
      )}

      {saved.length > 0 && (
        <div className="flex gap-3">
          {/* Recipe list */}
          <div className="flex-1 space-y-1">
            {ALPHABET.filter(letter => grouped[letter]).map(letter => (
              <div key={letter} ref={el => sectionRefs.current[letter] = el}>
                {/* Letter header */}
                <div
                  className="sticky top-0 z-10 py-1.5 px-2 mb-1 mt-2 first:mt-0"
                  style={{ backgroundColor: 'var(--color-bg)' }}
                >
                  <p className="font-bold" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-purple)' }}>{letter}</p>
                </div>

                {/* Recipes under this letter */}
                <div className="space-y-2">
                  {grouped[letter].map(recipe => {
                    const iconData = recipeIcons[recipe.icon];
                    return (
                      <Card key={recipe.id} animate={false} padding="p-0" className="overflow-hidden">
                        <div className="w-full text-left p-3 min-h-[48px]">
                          <div className="flex items-start justify-between gap-2">
                            <button
                              onClick={() => setExpanded(expanded === recipe.id ? null : recipe.id)}
                              className="flex items-center gap-3 flex-1 text-left"
                            >
                              {iconData && (
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: iconData.bg }}>
                                  <iconData.Icon size={18} style={{ color: iconData.color }} />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>{recipe.name}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="flex items-center gap-1" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                                    <Clock size={12} /> {recipe.time}
                                  </span>
                                </div>
                              </div>
                            </button>
                            <div className="flex items-center gap-0.5 flex-shrink-0">
                              <button
                                onClick={() => toggleSavedRecipe(recipe.id)}
                                className="w-9 h-9 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full"
                                aria-label="Remove from recipe book"
                              >
                                <Bookmark size={18} fill="var(--color-purple)" style={{ color: 'var(--color-purple)' }} />
                              </button>
                              <button
                                onClick={() => setExpanded(expanded === recipe.id ? null : recipe.id)}
                                className="w-7 h-9 flex items-center justify-center"
                              >
                                {expanded === recipe.id ? <ChevronUp size={18} style={{ color: 'var(--color-text-muted)' }} /> : <ChevronDown size={18} style={{ color: 'var(--color-text-muted)' }} />}
                              </button>
                            </div>
                          </div>
                        </div>
                        {expanded === recipe.id && (
                          <div className="px-3 pb-3 border-t" style={{ borderColor: 'var(--color-surface-muted)' }}>
                            <div className="mt-3">
                              <p className="font-semibold mb-2" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>Ingredients</p>
                              {recipe.ingredients.map((ing, i) => (
                                <p key={i} className="flex items-start gap-2" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)' }}>
                                  <span style={{ color: 'var(--color-teal)' }}>•</span> {ing}
                                </p>
                              ))}
                            </div>
                            <div className="mt-3">
                              <p className="font-semibold mb-2" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>Instructions</p>
                              {recipe.instructions.map((step, i) => (
                                <p key={i} className="mb-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)' }}>
                                  <span className="font-semibold" style={{ color: 'var(--color-teal)' }}>{i + 1}.</span> {step}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* A-Z sidebar */}
          <div className="flex flex-col items-center gap-0 py-1 flex-shrink-0" style={{ width: '24px' }}>
            {ALPHABET.map(letter => {
              const isActive = activeLetters.includes(letter);
              return (
                <button
                  key={letter}
                  onClick={() => isActive && scrollToLetter(letter)}
                  className="w-6 h-5 flex items-center justify-center"
                  style={{
                    fontSize: '10px',
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? 'var(--color-purple)' : 'var(--color-surface-muted)',
                  }}
                  disabled={!isActive}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <ReturnCapsules sectionName="Nutrition" sectionPath="/explore/nutrition" />
    </PageShell>
  );
}
