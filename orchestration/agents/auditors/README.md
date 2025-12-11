# 🔍 Auditors

Quality verification and certification agents that ensure content meets Esy standards before publication.

---

## Agents in This Category

| Agent | Domain | Gate Owned | Output |
|-------|--------|------------|--------|
| [Citation Audit Agent](./citation-audit-agent.md) | Sources & Links | G5 | Citation Certification |
| [Quotes Audit Agent](./quotes-audit-agent.md) | Quote Authenticity | — | Quote verdicts (✅⚠️🟡❌🚫) |
| [Visual Auditor Agent](./visual-auditor-agent.md) | SVG Quality | — | Grade A+ to F |
| [Scrollytelling Audit Agent](./scrollytelling-audit-agent.md) | Experience Quality | — | Improvement recommendations |
| [Immersive Scrolling Auditor](./immersive-scrolling-auditor.md) | Scroll Performance | G6 | Scroll Certification |
| [Immersive Experience Auditor](./immersive-experience-auditor.md) | Overall Experience | — | Experience Certification |
| [SEO Audit Agent](./seo-audit-agent.md) | Search Optimization | — | SEO Grade A+ to F |

---

## Report Storage

| Report Type | Location |
|-------------|----------|
| Citation Audits | `./CitationReports/` |
| Visual Audits | `./VisualAuditReports/` |

---

## When to Use

| Scenario | Agent |
|----------|-------|
| Verify source quality & links | Citation Audit Agent |
| Check quote authenticity | Quotes Audit Agent |
| Audit SVG assets | Visual Auditor Agent |
| Full experience review | Immersive Experience Auditor |
| Scroll-lock & 60fps check | Immersive Scrolling Auditor |
| SEO optimization check | SEO Audit Agent |
| **Comprehensive QA** | Use Meta Audit Orchestrator (orchestrators/) |

---

## Audit Pipeline

```
Meta Audit Orchestrator
├── Scrolling Auditor (G6)
├── Experience Auditor
├── Visual Auditor
├── Citation Audit (G5)
│   └── Quotes Audit
└── SEO Audit
        │
        ▼
   CERTIFICATION
   ✅ CERTIFIED / ⚠️ CONDITIONAL / ❌ REJECTED
```

---

## Invocation Pattern

```
Using @agents/auditors/citation-audit-agent.md, audit the citations for
/essays/visual/[SLUG]
```

---

## See Also

- [Agent Registry](../AGENT-REGISTRY.md) — Complete agent index
- [Meta Audit Orchestrator](../orchestrators/meta-audit-orchestrator.md) — Coordinates all auditors

