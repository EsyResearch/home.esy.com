"use client"
import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Share2, Bookmark, Menu, X,
  Sun, Moon, Type, Minus, Plus, Twitter, Linkedin, Link as LinkIcon, Check
} from 'lucide-react';
import { fontSizes } from './essayUtils';
import styles from './EssayHeader.module.css';

const EssayHeader = ({
  theme,
  setTheme,
  fontSize,
  setFontSize,
  isBookmarked,
  setIsBookmarked,
  showShareMenu,
  setShowShareMenu,
  linkCopied,
  handleShare,
  showTOC,
  setShowTOC,
  onBackToEssays,
  currentTheme
}) => {
  const headerClass = `${styles.header} ${theme === 'dark' ? styles.headerDark : styles.headerLight}`;
  const backLinkClass = `${styles.backLink} ${theme === 'dark' ? styles.backLinkDark : styles.backLinkLight}`;
  const contentsButtonClass = `${styles.contentsButton} ${theme === 'dark' ? styles.contentsButtonDark : styles.contentsButtonLight}`;
  const fontSizeControlsClass = `${styles.fontSizeControls} ${theme === 'dark' ? styles.fontSizeControlsDark : styles.fontSizeControlsLight}`;
  const themeButtonClass = `${styles.themeButton} ${theme === 'dark' ? styles.themeButtonDark : styles.themeButtonLight}`;
  const actionButtonClass = `${styles.actionButton} ${theme === 'dark' ? styles.actionButtonDark : styles.actionButtonLight}`;
  const shareMenuClass = `${styles.shareMenu} ${theme === 'dark' ? styles.shareMenuDark : styles.shareMenuLight}`;
  const shareButtonClass = `${styles.shareButton} ${theme === 'dark' ? styles.shareButtonDark : styles.shareButtonLight}`;

  return (
    <header className={headerClass}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <div className={styles.leftSection}>
            <Link href="/essays" className={backLinkClass}>
              <ArrowLeft size={16} />
              Back to Essays
            </Link>
            
            <button
              className={contentsButtonClass}
              onClick={() => setShowTOC(!showTOC)}
            >
              <Menu size={14} />
              Contents
            </button>
          </div>

          <div className={styles.rightSection}>
            {/* Font Size Controls */}
            <div className={fontSizeControlsClass}>
              <button
                className={`${styles.fontSizeButton} ${theme === 'dark' ? styles.fontSizeButtonDark : styles.fontSizeButtonLight} ${fontSize === 'small' ? (theme === 'dark' ? styles.fontSizeButtonDisabledDark : styles.fontSizeButtonDisabledLight) : ''}`}
                onClick={() => setFontSize('small')}
                disabled={fontSize === 'small'}
              >
                <Minus size={14} />
              </button>
              <Type size={14} style={{ color: currentTheme.muted }} />
              <button
                className={`${styles.fontSizeButton} ${theme === 'dark' ? styles.fontSizeButtonDark : styles.fontSizeButtonLight} ${fontSize === 'large' ? (theme === 'dark' ? styles.fontSizeButtonDisabledDark : styles.fontSizeButtonDisabledLight) : ''}`}
                onClick={() => setFontSize('large')}
                disabled={fontSize === 'large'}
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              className={themeButtonClass}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Actions */}
            <button
              className={`${actionButtonClass} ${isBookmarked ? styles.bookmarked : ''}`}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark size={18} fill={isBookmarked ? '#6366f1' : 'none'} />
            </button>

            <div className={styles.shareMenuContainer}>
              <button
                className={actionButtonClass}
                onClick={() => setShowShareMenu(!showShareMenu)}
              >
                <Share2 size={18} />
              </button>

              {showShareMenu && (
                <div className={shareMenuClass}>
                  <button
                    className={shareButtonClass}
                    onClick={() => handleShare('twitter')}
                  >
                    <Twitter size={16} />
                    Twitter
                  </button>
                  <button
                    className={shareButtonClass}
                    onClick={() => handleShare('linkedin')}
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </button>
                  <button
                    className={shareButtonClass}
                    onClick={() => handleShare('link')}
                  >
                    {linkCopied ? <Check size={16} /> : <LinkIcon size={16} />}
                    {linkCopied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EssayHeader; 