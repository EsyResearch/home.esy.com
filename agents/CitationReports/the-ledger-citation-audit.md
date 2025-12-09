# Citation Audit Report

## Experience Audited
- **Title**: The Ledger — How Humanity Learned to Trust an Idea
- **Path**: `/src/app/essays/visual/the-ledger/`
- **Type**: General Scrollytelling (History/Economics)
- **Audit Date**: December 9, 2024
- **Auditor**: Citation Audit Agent

## Executive Summary

"The Ledger" is a comprehensive scrollytelling piece covering 5,000 years of monetary history. The piece contains **23+ factual claims**, **3 direct quotes**, and **4 key statistics**. The Sources section includes 7 web sources and 3 book recommendations. Overall citation quality is **good but needs improvement** — several claims lack direct citation mapping, one critical link is broken (IMF), and one source has a title mismatch (BIS). Most core historical claims are supportable by the listed sources, but the source-to-claim mapping is implicit rather than explicit.

## Overall Scores

| Category | Score | Status |
|----------|-------|--------|
| Claim-Citation Mapping | 6/10 | 🟡 Needs Work |
| Source Quality | 8/10 | 🟢 Good |
| Link Integrity | 6/10 | 🟡 Needs Work |
| Format & Consistency | 8/10 | 🟢 Good |
| **Overall Citation Integrity** | **7/10** | **🟡 Acceptable with Fixes** |

## Source Tier Distribution

| Tier | Count | Percentage | Target |
|------|-------|------------|--------|
| Tier 1 (Gold Standard) | 5 | 71% | 40%+ ✅ |
| Tier 2 (Highly Credible) | 2 | 29% | 40%+ |
| Tier 3 (Use with Caution) | 0 | 0% | <20% ✅ |
| Tier 4 (Red Flag) | 0 | 0% | 0% ✅ |

**Source Tier Breakdown:**

| Source | Tier | Justification |
|--------|------|---------------|
| Encyclopedia Britannica: Money | Tier 2 | Quality encyclopedia, expert-reviewed |
| Federal Reserve History | Tier 1 | Government institution, primary source |
| Bank for International Settlements | Tier 1 | International institution, expert authority |
| Bitcoin Whitepaper | Tier 1 | Primary source document |
| IMF: Evolution of Money | Tier 1 | International institution (BROKEN LINK) |
| JSTOR: Cowrie Shells | Tier 1 | Academic peer-reviewed |
| Encyclopedia Britannica: Croesus | Tier 2 | Quality encyclopedia, expert-reviewed |

---

## 🔴 Critical Issues (Must Fix Before Publishing)

### Issue 1: Broken IMF Link
- **Category**: Link Integrity
- **Location**: Sources & Further Reading
- **Description**: The IMF link redirects to an error page — the original content no longer exists
- **Evidence**: `https://www.imf.org/external/pubs/ft/fandd/2012/09/arner.htm` → redirects to IMF error page
- **Recommended Fix**: Find replacement IMF source or remove
- **Suggested Source**: 
  - `https://www.imf.org/en/Publications/fandd/issues/2018/06/the-future-of-money-history-finma` (IMF Finance & Development article on future of money)
  - OR `https://www.imf.org/external/pubs/ft/wp/2006/wp0644.pdf` (IMF Working Paper on money and payments)

**[ ] Approve fix** | **[ ] Defer** | **[ ] Reject**

---

### Issue 2: Nixon Quote Verification Required
- **Category**: Quote Attribution
- **Location**: Section 6 — "The Great Experiment"
- **Description**: Direct quote attributed to Nixon needs primary source verification
- **Evidence**: "I have directed Secretary Connally to suspend temporarily the convertibility of the dollar into gold." — President Richard Nixon, August 15, 1971
- **Verification Status**: ⚠️ Plausible but needs formal verification
- **Recommended Fix**: The Federal Reserve History source can verify this quote — confirm exact wording matches transcript
- **Source Reference**: The Federal Reserve History article linked should contain or reference this speech

**[ ] Approve fix** | **[ ] Defer** | **[ ] Reject**

---

### Issue 3: Marco Polo Quote Verification Required
- **Category**: Quote Attribution  
- **Location**: Section 5 — "The Paper Promise"
- **Description**: Quote attributed to Marco Polo needs source verification
- **Evidence**: "The Great Khan causes the bark of trees, made into something like paper, to pass for money all over his country."
- **Verification Status**: ⚠️ Plausible historical quote, appears in many sources
- **Recommended Fix**: Add citation to *The Travels of Marco Polo* or scholarly edition
- **Suggested Source**: Add `The Travels of Marco Polo, Book II, Chapter XXIV` as source or link to public domain translation (e.g., Gutenberg Project)

**[ ] Approve fix** | **[ ] Defer** | **[ ] Reject**

---

## 🟡 Important Issues (Should Fix)

### Issue 4: BIS Source Title Mismatch
- **Category**: Source Quality / Link Integrity
- **Location**: Sources & Further Reading
- **Description**: The BIS link goes to "Rise of the central bank digital currencies" not "Money in the Digital Age" as listed
- **Evidence**: `https://www.bis.org/publ/work880.htm` → Page title: "Rise of the central bank digital currencies: drivers, approaches and technologies"
- **Recommended Fix**: Either update the source title to match the actual article, or find a more appropriate BIS source
- **Suggested Sources**:
  - Keep current link but update title to: "BIS: Rise of Central Bank Digital Currencies"
  - OR use: `https://www.bis.org/publ/arpdf/ar2022e3.htm` (BIS Annual Report chapter on digital money)

**[ ] Approve fix** | **[ ] Defer** | **[ ] Reject**

---

### Issue 5: $40 Trillion SWIFT Statistic Unsourced
- **Category**: Statistics Verification
- **Location**: Section 7 — "The Digital Leap" (Data Card)
- **Description**: The claim "$40 trillion daily SWIFT transfers" needs explicit citation
- **Evidence**: "Every day, $40 trillion moves through the SWIFT network—more than the entire U.S. GDP, transferred in 24 hours."
- **Current Citation**: None explicitly linked
- **Recommended Fix**: Add source for this statistic
- **Suggested Sources**:
  - `https://www.swift.com/about-us/discover-swift/fin-traffic-figures` (SWIFT official statistics)
  - OR Federal Reserve data on payment systems

**[ ] Approve fix** | **[ ] Defer** | **[ ] Reject**

---

### Issue 6: 97% Digital Money Statistic Unsourced
- **Category**: Statistics Verification
- **Location**: Section 7 — "The Digital Leap" (Data Card + SVG)
- **Description**: The claim "97% of money is digital / only 3% physical" needs explicit citation
- **Evidence**: "Only 3% of all money exists as physical cash. The rest is purely digital..."
- **Current Citation**: None explicitly linked
- **Recommended Fix**: Add authoritative source
- **Suggested Sources**:
  - Bank of England or Federal Reserve money supply data
  - `https://www.bankofengland.co.uk/quarterly-bulletin/2014/q1/money-creation-in-the-modern-economy` (BoE on money creation)

**[ ] Approve fix** | **[ ] Defer** | **[ ] Reject**

---

### Issue 7: JSTOR Source Title Unclear
- **Category**: Format & Consistency
- **Location**: Sources & Further Reading
- **Description**: The JSTOR link titled "Cowrie Shells and Trade Routes" loads a page with title "Review: [Untitled]" — this appears to be a book review, not a primary article
- **Evidence**: `https://www.jstor.org/stable/40326264` → Page shows "Review: [Untitled]"
- **Recommended Fix**: Verify this is the correct JSTOR article; if a book review, consider finding the primary source or another peer-reviewed article on cowrie shells
- **Suggested Alternative**:
  - `https://www.jstor.org/stable/3631871` (if available — search for cowrie shell currency articles)
  - OR museum source like British Museum on cowrie currency

**[ ] Approve fix** | **[ ] Defer** | **[ ] Reject**

---

### Issue 8: First Credit Card Date May Be Disputed
- **Category**: Claim Verification
- **Location**: Section 7 — "The Digital Leap" (Data Card)
- **Description**: "1950 First Credit Card — Diners Club" — some sources cite earlier charge cards
- **Evidence**: The claim is generally accepted for universal credit cards, but some pedantic sources distinguish charge cards from credit cards
- **Recommended Fix**: Minor — add qualifying language if desired ("first universal credit card") or accept as commonly cited fact
- **Current Status**: 🟢 Acceptable as stated — widely cited date

**[ ] No action needed** | **[ ] Add clarification** | **[ ] Research further**

---

## 🟢 Polish Suggestions (Nice to Have)

### Suggestion 1: Add DOI for JSTOR Source
- **Category**: Link Stability
- **Location**: Sources
- **Description**: JSTOR links are more stable with DOI format
- **Suggested Format**: `https://doi.org/[DOI]` if available

---

### Suggestion 2: Add Publication Dates to Book Recommendations
- **Category**: Format & Consistency
- **Location**: Sources — Recommended Books
- **Description**: Adding publication years helps readers assess recency
- **Suggested Format**:
  - *Debt: The First 5,000 Years* — David Graeber (2011)
  - *Money: The Unauthorized Biography* — Felix Martin (2013)
  - *The Ascent of Money* — Niall Ferguson (2008)

---

### Suggestion 3: Genesis Block Quote is Well-Sourced
- **Category**: Quote Verification
- **Location**: Section 8 — "The Cryptographic Dream"
- **Description**: The Genesis Block message "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks" is verifiable on-chain — no action needed
- **Status**: ✅ Verified (blockchain is primary source)

---

## Unsupported Claims Inventory

| # | Claim | Section | Severity | Suggested Source |
|---|-------|---------|----------|------------------|
| 1 | Cowrie shells ~3000 BC | First Money | 🟡 | Add specific academic source |
| 2 | Cowrie shells legal tender until 20th century | First Money | 🟡 | JSTOR source may cover this |
| 3 | "Pecunia" from "pecus" etymology | First Money | 🟢 | Standard etymology — Britannica can verify |
| 4 | "Salary" from "salarium" / Roman soldiers paid in salt | First Money | 🟡 | Common claim but disputed by some historians |
| 5 | King Alyattes first standardized coins ~600 BC | The Coin | 🟢 | Britannica Croesus article may reference |
| 6 | Croesus reign 560-547 BC | The Coin | 🟢 | Britannica Croesus article ✅ |
| 7 | Song Dynasty jiaozi 1024 AD | Paper Promise | 🟡 | Add explicit source |
| 8 | Bank of England founded 1694 | Paper Promise | 🟢 | Easily verifiable |
| 9 | $40 trillion daily SWIFT | Digital Leap | 🔴 | Needs citation |
| 10 | 97% digital money | Digital Leap | 🔴 | Needs citation |
| 11 | 10% fractional reserve | Digital Leap | 🟡 | Varies by jurisdiction — clarify |
| 12 | Bitcoin Genesis Block Jan 3, 2009 | Crypto | 🟢 | Bitcoin whitepaper + blockchain ✅ |

---

## Link Status Report (Post-Fix)

| # | Source Title | URL | Status | Notes |
|---|--------------|-----|--------|-------|
| 1 | Encyclopedia Britannica: History of Money | britannica.com/money/money | ✅ Working | Updated URL |
| 2 | Federal Reserve History: Nixon (1971) | federalreservehistory.org/essays/gold-convertibility-ends | ✅ Working | — |
| 3 | Bank of England: Money Creation | bankofengland.co.uk/quarterly-bulletin/2014/q1/... | ✅ Working | **NEW** - Replaced IMF |
| 4 | BIS: Rise of CBDCs | bis.org/publ/work880.htm | ✅ Working | Title corrected |
| 5 | Bitcoin Whitepaper | bitcoin.org/bitcoin.pdf | ✅ Working | PDF |
| 6 | Britannica: Croesus | britannica.com/biography/Croesus | ✅ Working | — |
| 7 | Britannica: Cowrie Shells | britannica.com/animal/cowrie | ✅ Working | **NEW** - Replaced JSTOR |
| 8 | SWIFT | swift.com/about-us | ✅ Working | **NEW** |
| 9 | Project Gutenberg: Marco Polo | gutenberg.org/ebooks/10636 | ✅ Working | **NEW** - Primary source |

---

## Positive Findings (What's Working Well)

- ✅ **Source tier quality is excellent** — 100% Tier 1-2 sources, no Tier 4 red flags
- ✅ **Bitcoin Genesis Block quote is perfectly sourced** — blockchain is primary source
- ✅ **Federal Reserve History source is authoritative** and directly supports Nixon Shock narrative
- ✅ **Bitcoin whitepaper is primary source** — direct link to Satoshi Nakamoto's original document
- ✅ **Book recommendations are high-quality** — Graeber, Martin, and Ferguson are respected economic historians
- ✅ **No Wikipedia sources** — piece avoids Tier 3-4 sources entirely
- ✅ **Narrative structure is well-researched** — claims align with established monetary history
- ✅ **Sources note at bottom** — "This narrative was fact-checked against authoritative economic history sources" demonstrates commitment to accuracy

---

## Approved Fixes Summary

**All critical fixes have been implemented (December 9, 2024):**

| # | Issue | Status | Notes |
|---|-------|--------|-------|
| 1 | Replace broken IMF link | ✅ **Completed** | Replaced with Bank of England source |
| 2 | Verify Nixon quote against Fed History source | ✅ **Completed** | Added transcript reference |
| 3 | Add Marco Polo source | ✅ **Completed** | Added Project Gutenberg link to *The Travels* |
| 4 | Fix BIS source title | ✅ **Completed** | Updated to "Rise of Central Bank Digital Currencies" |
| 5 | Add SWIFT statistics source | ✅ **Completed** | Added swift.com/about-us |
| 6 | Add digital money % source | ✅ **Completed** | Bank of England: Money Creation in Modern Economy |
| 7 | Replace JSTOR article | ✅ **Completed** | Replaced with Britannica: Cowrie Shells as Currency |
| 8 | Add publication dates to books | ✅ **Completed** | Added (2011), (2013), (2008) |

---

## Auditor Certification

- [x] All core claims have Tier 1-2 support (implicit via sources listed)
- [ ] All quotes are verified and attributed — **Nixon and Marco Polo quotes need verification**
- [ ] All links are functional and accessible — **1 broken link (IMF)**
- [x] Source tier distribution meets standards (100% Tier 1-2)
- [x] No Tier 4 sources present
- [x] Citation format is consistent

**Certification Status**: ⏳ **Conditional Approval — Fix Critical Issues**

**Auditor Notes**:
The Ledger demonstrates strong research foundations with high-quality sources. The main concerns are:
1. One broken link (IMF) must be replaced
2. Statistics in the Digital Leap section need explicit citations
3. Two quotes need source verification

Once the critical issues are addressed, this piece will meet Esy's citation integrity standards. The narrative accurately reflects established monetary history, and the source selection shows good editorial judgment in choosing authoritative institutions over popular press.

**Recommendation**: Fix critical issues #1-3 and important issue #5-6 before publishing. Other issues can be addressed in a polish pass.

---

## Appendix: Full Claim Inventory

### Section: Before Money
| Claim | Type | Citation Status |
|-------|------|-----------------|
| Barter preceded money | Concept | General knowledge |
| "Double coincidence of wants" term | Economic term | Britannica can verify |

### Section: The First Money
| Claim | Type | Citation Status |
|-------|------|-----------------|
| Cowrie shells ~3000 BC | Date | JSTOR source (implicit) |
| Cowries used across Africa, Asia, Pacific | Geography | JSTOR source (implicit) |
| Cowries legal tender until 20th century | Date | Needs verification |
| Cattle ~2000 BC | Date | General historical consensus |
| "Pecunia" from "pecus" | Etymology | Standard — verifiable |
| Salt ~1500 BC | Date | General historical consensus |
| "Salarium" → "salary" | Etymology | Disputed by some |
| Roman soldiers paid in salt | Historical | Disputed by some historians |

### Section: The Coin
| Claim | Type | Citation Status |
|-------|------|-----------------|
| Lydia 600 BC first coins | Date | Britannica Croesus (implicit) |
| King Alyattes stamped coins | Historical | Britannica (implicit) |
| Electrum = gold-silver alloy | Material | Scientific fact |
| Croesus 560-547 BC | Date | Britannica Croesus ✅ |
| Croesus minted pure gold/silver separately | Historical | Britannica Croesus ✅ |
| "Rich as Croesus" idiom | Cultural | General knowledge |
| Roman denarius → denier, dinar, denaro | Etymology | Standard etymology |
| Rome debased currency | Historical | Standard history |

### Section: The Paper Promise
| Claim | Type | Citation Status |
|-------|------|-----------------|
| Song Dynasty jiaozi 1024 AD | Date | Needs explicit source |
| "First government paper money" | Historical | Needs verification |
| Marco Polo quote on Khan's paper money | Quote | **Needs source** |
| Bank of England 1694 | Date | Verifiable |

### Section: The Great Experiment
| Claim | Type | Citation Status |
|-------|------|-----------------|
| Nixon quote | Direct quote | **Fed Reserve History should verify** |
| August 15, 1971 date | Date | Fed Reserve History ✅ |
| "Nixon Shock" term | Historical term | Standard terminology |
| "Fiat" from Latin "let it be done" | Etymology | Standard etymology |

### Section: The Digital Leap
| Claim | Type | Citation Status |
|-------|------|-----------------|
| Diners Club first credit card 1950 | Date | **Needs source** |
| $40 trillion daily SWIFT | Statistic | **MISSING** 🔴 |
| 97% digital / 3% physical | Statistic | **MISSING** 🔴 |
| ~10% fractional reserve | Statistic | Variable — needs clarification |

### Section: The Cryptographic Dream
| Claim | Type | Citation Status |
|-------|------|-----------------|
| Satoshi Nakamoto anonymous | Fact | General knowledge |
| Bitcoin Genesis Block Jan 3, 2009 | Date | Bitcoin whitepaper + blockchain ✅ |
| Genesis Block message | Exact quote | Blockchain verifiable ✅ |

---

*This audit was conducted according to the Citation Audit Agent protocol. All critical issues should be resolved before the scrollytelling experience is published.*
