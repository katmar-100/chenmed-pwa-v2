import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { recipes } from '../../data/mockData';
import PageShell from '../../components/ui/PageShell';
import Card from '../../components/ui/Card';
import { ArrowLeft, Search, Clock, ChevronDown, ChevronUp, Play, Fish, Soup, CupSoda, Sandwich, Wheat, Bookmark, BookOpen, ChevronRight } from 'lucide-react';
import ReturnCapsules from '../../components/ui/ReturnCapsules';
import { motion } from 'framer-motion';

const recipeIcons = {
  fish: { Icon: Fish, color: '#0097A7', bg: '#CCF0F6' },
  soup: { Icon: Soup, color: '#E65100', bg: '#FFF3E0' },
  smoothie: { Icon: CupSoda, color: '#7B1FA2', bg: '#F3E5F5' },
  wrap: { Icon: Sandwich, color: '#2E7D32', bg: '#E8F5E9' },
  bowl: { Icon: Wheat, color: '#F57F17', bg: '#FFF8E1' },
};

export default function Nutrition() {
  const navigate = useNavigate();
  const { savedRecipes, toggleSavedRecipe } = useApp();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  const filtered = recipes.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <PageShell>
      <button onClick={() => navigate('/explore')} className="flex items-center gap-2 mb-4 min-h-[48px]" style={{ color: 'var(--color-teal)' }}>
        <ArrowLeft size={20} /> Back to Explore
      </button>
      <h1 className="font-semibold mb-1" style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-heading)' }}>Nutrition</h1>
      <p className="mb-4" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Eat well, feel&nbsp;well</p>

      {/* Recipe Book Capsule */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={() => navigate('/explore/nutrition/recipe-book')}
        className="w-full rounded-2xl p-4 mb-5 text-left"
        style={{
          background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-light))',
          boxShadow: '0 4px 12px rgba(13, 124, 124, 0.25)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              <BookOpen size={20} style={{ color: 'white' }} />
            </div>
            <div>
              <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'white' }}>My Recipe Book</p>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.8)' }}>
                {savedRecipes.length === 0 ? 'No recipes saved\u00A0yet' : `${savedRecipes.length} recipe${savedRecipes.length === 1 ? '' : 's'} saved`}
              </p>
            </div>
          </div>
          <ChevronRight size={20} style={{ color: 'rgba(255,255,255,0.8)' }} />
        </div>
      </motion.button>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
        <input
          type="text"
          placeholder="Search recipes or health topics..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-xl pl-10 pr-4 py-3 min-h-[48px]"
          style={{ backgroundColor: 'var(--color-card)', fontSize: 'var(--font-size-sm)', border: 'none', outline: 'none', color: 'var(--color-text)', boxShadow: '0 1px 3px var(--color-shadow)' }}
        />
      </div>

      {/* Recipes */}
      <div className="space-y-3">
        {filtered.map(recipe => {
          const isSaved = savedRecipes.includes(recipe.id);
          return (
            <Card key={recipe.id} animate={false} padding="p-0" className="overflow-hidden">
              <div className="w-full text-left p-4 min-h-[48px]">
                <div className="flex items-start justify-between gap-2">
                  <button
                    onClick={() => setExpanded(expanded === recipe.id ? null : recipe.id)}
                    className="flex items-start gap-3 flex-1 text-left"
                  >
                    {(() => {
                      const iconData = recipeIcons[recipe.icon];
                      if (!iconData) return null;
                      const { Icon: RecipeIcon, color, bg } = iconData;
                      return (
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: bg }}>
                          <RecipeIcon size={22} style={{ color }} />
                        </div>
                      );
                    })()}
                    <div>
                      <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>{recipe.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                          <Clock size={14} /> {recipe.time}
                        </span>&nbsp;
                        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{recipe.difficulty}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {recipe.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded-full font-semibold" style={{ fontSize: 'var(--font-size-xs)', backgroundColor: 'var(--color-teal-pale)', color: 'var(--color-teal)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSavedRecipe(recipe.id); }}
                      className="w-10 h-10 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full"
                      aria-label={isSaved ? 'Remove from recipe book' : 'Save to recipe book'}
                    >
                      <Bookmark
                        size={20}
                        fill={isSaved ? 'var(--color-purple)' : 'none'}
                        style={{ color: isSaved ? 'var(--color-purple)' : 'var(--color-text-muted)' }}
                      />
                    </button>
                    <button
                      onClick={() => setExpanded(expanded === recipe.id ? null : recipe.id)}
                      className="w-8 h-10 flex items-center justify-center"
                    >
                      {expanded === recipe.id ? <ChevronUp size={20} style={{ color: 'var(--color-text-muted)' }} /> : <ChevronDown size={20} style={{ color: 'var(--color-text-muted)' }} />}
                    </button>
                  </div>
                </div>
              </div>
              {expanded === recipe.id && (
                <div className="px-4 pb-4 border-t" style={{ borderColor: 'var(--color-surface-muted)' }}>
                  <div className="mt-3">
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>Ingredients</p>
                    {recipe.ingredients.map((ing, i) => (
                      <p key={i} className="flex items-start gap-2" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)' }}>
                        <span style={{ color: 'var(--color-teal)' }}>•</span>&nbsp;{ing}
                      </p>
                    ))}
                  </div>
                  <div className="mt-3">
                    <p className="font-semibold mb-2" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>Instructions</p>
                    {recipe.instructions.map((step, i) => (
                      <p key={i} className="mb-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)' }}>
                        <span className="font-semibold" style={{ color: 'var(--color-teal)' }}>{i + 1}.</span>&nbsp;{step}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Video Mockups */}
      <h2 className="font-semibold mt-6 mb-3" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>Videos</h2>
      {[
        { title: "Cooking with Dr. Maria: Easy Heart-Healthy Dinners", duration: "12 min" },
        { title: "5-Minute Meals for Better Blood Sugar", duration: "8 min" },
      ].map((vid, i) => (
        <Card key={i} animate={false} padding="p-3" className="mb-3">
          <div className="flex items-center gap-3">
            <div className="w-16 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-surface-muted)' }}>
              <Play size={20} style={{ color: 'var(--color-teal)' }} />
            </div>
            <div>
              <p className="font-semibold" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>{vid.title}</p>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{vid.duration} — Coming&nbsp;soon!</p>
            </div>
          </div>
        </Card>
      ))}

      <ReturnCapsules sectionName="Explore" sectionPath="/explore" />
    </PageShell>
  );
}
