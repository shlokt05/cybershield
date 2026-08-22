import React, { createContext, useContext, useState, useEffect } from 'react';
import { MODULE_HANDBOOKS, ModuleHandbook, HandbookChapter, HandbookSection } from '../lib/handbookData';

interface HandbookContextType {
  handbooks: Record<string, ModuleHandbook>;
  updateChapter: (moduleId: string, chapterIndex: number, updatedChapter: HandbookChapter) => void;
  addSectionToChapter: (moduleId: string, chapterIndex: number, section: HandbookSection) => void;
  deleteSectionFromChapter: (moduleId: string, chapterIndex: number, sectionIndex: number) => void;
  importHandbookFromJSON: (moduleId: string, jsonString: string) => boolean;
  exportHandbookToJSON: (moduleId: string) => string;
  resetHandbookToDefault: (moduleId?: string) => void;
}

const STORAGE_KEY = 'cybershield_custom_handbooks_v1';

const HandbookContext = createContext<HandbookContextType | undefined>(undefined);

export const HandbookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [handbooks, setHandbooks] = useState<Record<string, ModuleHandbook>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...MODULE_HANDBOOKS, ...parsed };
      }
    } catch (e) {
      console.error('Failed to parse custom handbooks from localStorage:', e);
    }
    return MODULE_HANDBOOKS;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(handbooks));
    } catch (e) {
      console.error('Failed to save handbooks to localStorage:', e);
    }
  }, [handbooks]);

  const updateChapter = (moduleId: string, chapterIndex: number, updatedChapter: HandbookChapter) => {
    setHandbooks(prev => {
      const currentModule = prev[moduleId] || MODULE_HANDBOOKS[moduleId];
      if (!currentModule) return prev;

      const updatedChapters = [...currentModule.chapters];
      updatedChapters[chapterIndex] = updatedChapter;

      return {
        ...prev,
        [moduleId]: {
          ...currentModule,
          chapters: updatedChapters
        }
      };
    });
  };

  const addSectionToChapter = (moduleId: string, chapterIndex: number, section: HandbookSection) => {
    setHandbooks(prev => {
      const currentModule = prev[moduleId] || MODULE_HANDBOOKS[moduleId];
      if (!currentModule || !currentModule.chapters[chapterIndex]) return prev;

      const updatedChapters = [...currentModule.chapters];
      const targetChapter = updatedChapters[chapterIndex];

      updatedChapters[chapterIndex] = {
        ...targetChapter,
        sections: [...targetChapter.sections, section]
      };

      return {
        ...prev,
        [moduleId]: {
          ...currentModule,
          chapters: updatedChapters
        }
      };
    });
  };

  const deleteSectionFromChapter = (moduleId: string, chapterIndex: number, sectionIndex: number) => {
    setHandbooks(prev => {
      const currentModule = prev[moduleId] || MODULE_HANDBOOKS[moduleId];
      if (!currentModule || !currentModule.chapters[chapterIndex]) return prev;

      const updatedChapters = [...currentModule.chapters];
      const targetChapter = updatedChapters[chapterIndex];

      const filteredSections = targetChapter.sections.filter((_, idx) => idx !== sectionIndex);

      updatedChapters[chapterIndex] = {
        ...targetChapter,
        sections: filteredSections
      };

      return {
        ...prev,
        [moduleId]: {
          ...currentModule,
          chapters: updatedChapters
        }
      };
    });
  };

  const importHandbookFromJSON = (moduleId: string, jsonString: string): boolean => {
    try {
      const parsedChapterList = JSON.parse(jsonString);
      if (Array.isArray(parsedChapterList)) {
        setHandbooks(prev => {
          const currentModule = prev[moduleId] || MODULE_HANDBOOKS[moduleId];
          return {
            ...prev,
            [moduleId]: {
              ...currentModule,
              chapters: parsedChapterList
            }
          };
        });
        return true;
      }
    } catch (e) {
      console.error('Failed to import JSON notes:', e);
    }
    return false;
  };

  const exportHandbookToJSON = (moduleId: string): string => {
    const currentModule = handbooks[moduleId] || MODULE_HANDBOOKS[moduleId];
    return JSON.stringify(currentModule?.chapters || [], null, 2);
  };

  const resetHandbookToDefault = (moduleId?: string) => {
    if (moduleId) {
      setHandbooks(prev => ({
        ...prev,
        [moduleId]: MODULE_HANDBOOKS[moduleId]
      }));
    } else {
      setHandbooks(MODULE_HANDBOOKS);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <HandbookContext.Provider value={{
      handbooks,
      updateChapter,
      addSectionToChapter,
      deleteSectionFromChapter,
      importHandbookFromJSON,
      exportHandbookToJSON,
      resetHandbookToDefault
    }}>
      {children}
    </HandbookContext.Provider>
  );
};

export const useHandbookContext = () => {
  const context = useContext(HandbookContext);
  if (!context) {
    throw new Error('useHandbookContext must be used within a HandbookProvider');
  }
  return context;
};
