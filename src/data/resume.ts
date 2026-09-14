/**
 * 简历唯一数据源。
 * 内容基准：resume_DSV4_CC.html（2026-04-29 版），已合并原 resume.ts 中 HTML 缺失的技能项。
 * 2026-09 更新：补充 2025.12 起 AI 学习、AI 创业、AI 产品经历，整体定位调整为「AI 产品经理」。
 */

/** 项目要点：纯文本，或带前缀标签的要点（标签来自 HTML 版的 pc-tag） */
export type Highlight = string | { label: string; text: string };

export interface ResumeData {
  personal: {
    name: string;
    title: string;
    /** 英文职位，显示在中文职位下方 */
    titleEn?: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    website: string;
    avatar: string;
    /** 一句话定位，优先于 summary 展示 */
    tagline?: string;
    summary: string;
  };
  /** 数字概览，缺省则不渲染 */
  stats?: { value: string; label: string }[];
  /** 核心能力卡片，缺省则不渲染 */
  strengths?: { title: string; titleEn: string; description: string }[];
  skills: { category: string; items: string[] }[];
  experience: {
    company: string;
    position: string;
    period: string;
    location: string;
    description: string[];
  }[];
  projects: {
    name: string;
    period: string;
    /** 角色与客户，如「产品负责人 · 北京/湖南/广西电信」 */
    org?: string;
    tech: string[];
    description: string;
    highlights: Highlight[];
    link: string;
  }[];
  education: {
    school: string;
    degree: string;
    period: string;
    gpa: string;
    honors: string[];
  }[];
  /** 资质认证，缺省则不渲染 */
  certifications?: { name: string; level: string }[];
}

export const resumeData: ResumeData = {
  personal: {
    name: "曹嘉鹏",
    title: "AI 产品经理 · 15 年 B 端产品专家",
    titleEn: "AI Product Manager",
    email: "jacky_6313@163.com",
    // 手机号不写进仓库：本地从 .env.local 读取（该文件被 .gitignore 忽略）；
    // 线上 Vercel 不配置 VITE_PHONE，因此公开版不展示手机号，避免被爬虫抓取。
    phone: import.meta.env.VITE_PHONE ?? "",
    location: "中国",
    github: "https://github.com/gavincao6313-jpg",
    linkedin: "",
    website: "",
    avatar: "/caojp.jpg",
    tagline:
      "从电信 OSS 到 AI 产品：15 年 B 端产品沉淀 + 10 个月 AI 全栈实战。把大模型能力做成用户用得上、成本可控、结果可审计的产品。",
    summary:
      "15 年 B 端产品专家，2025 年底起全面转向 AI 领域。前 15 年深耕电信 OSS/BSS，主导北京、湖南、广西等多省核心资源系统的重构与数字化转型，拥有千万级数据规模的系统落地经验，并通过售前方案支撑多个千万级项目中标。2025 年 12 月起全职投入 AI：先用 5 个月完成覆盖 12 个模块的系统性知识重构，再独立完成 AI 短视频生成产品从 0 到 1 的定义、研发与商业化，已实现付费客户落地。擅长把大模型能力转化为可交付、成本可控、过程可审计的产品——在 LLM 应用架构、多模型编排、成本与配额治理、模型评测上有完整实战。北京邮电大学工程管理硕士，持 IPMP 国际项目经理认证及系统集成项目管理师证书。",
  },

  stats: [
    { value: "15+", label: "年产品经验" },
    { value: "3", label: "AI 产品 0→1" },
    { value: "¥5", label: "单分钟成片成本" },
    { value: "10+", label: "省级交付项目" },
  ],

  strengths: [
    {
      title: "AI 产品 0 到 1",
      titleEn: "AI Product 0→1",
      description:
        "独立完成 AI 短视频生成产品的需求定义、架构设计、研发交付与商业化，需求规格迭代至 v3.5，已实现付费客户落地。",
    },
    {
      title: "AI 工程化与成本治理",
      titleEn: "LLM Engineering & FinOps",
      description:
        "把「先预览后付费、预算上限、失败只重做单镜、逐条成本账单」做成产品能力；自研配额预算账本覆盖 RPM/TPM/RPD 三维限制，杜绝账单失控。",
    },
    {
      title: "复杂系统驾驭",
      titleEn: "System Architecture",
      description:
        "主导多省电信/移动核心资源系统的异构替换与数字化转型，具备千万级数据规模的系统落地经验，实现新旧系统割接业务零中断。",
    },
    {
      title: "产品 + 项目双重思维",
      titleEn: "Management",
      description:
        "北京邮电大学工程管理硕士，持有 IPMP 项目经理认证及系统集成项目管理师证书，擅长从 0 到 1 规划与从 1 到 N 标准化推广。",
    },
  ],

  skills: [
    {
      category: "AI 产品能力",
      items: [
        "LLM 应用架构",
        "多模型编排与路由",
        "Agent 与工具调用",
        "RAG 与知识库设计",
        "提示词与上下文工程",
        "多模态生成（文生图 / TTS / ASR / 数字人）",
        "模型评测与 A/B 实验",
        "AI 成本与配额治理",
      ],
    },
    {
      category: "AI 工程栈",
      items: [
        "Python / FastAPI",
        "React / TypeScript / Tauri",
        "Remotion 视频合成",
        "阿里云百炼",
        "火山方舟 Ark",
        "Gemini / Qwen API",
        "Claude Code / Codex 智能体开发",
      ],
    },
    {
      category: "核心能力",
      items: ["产品规划", "项目管理", "架构设计", "算法", "数据分析", "云计算", "运维"],
    },
    {
      category: "业务领域",
      items: ["OSS/BSS 业务架构", "数据中台架构", "资源管理系统", "网络优化", "GIS 应用"],
    },
    {
      category: "产品管理",
      items: ["产品路线图规划", "竞品分析", "需求分析", "BP 商业计划书", "用户故事"],
    },
    {
      category: "设计工具",
      items: ["Axure", "Visio", "XMind", "Project"],
    },
  ],

  experience: [
    {
      company: "独立创业 · AI 产品研发",
      position: "创始人 / AI 产品负责人",
      period: "2025.12 — 至今",
      location: "中国",
      description: [
        "2025.12 — 2026.04 全职系统性学习 AI：围绕 AI 产品经理能力模型构建覆盖 12 个模块的知识体系，从深度学习与 Transformer 原理，到提示词工程、Agent、微调蒸馏、多模态、工程化部署与成本、评估安全与治理、AI 商业化，全部完成整模块验收",
        "2026.05 至今主导两条产品线：「无相」AI 口播短视频生成器（面向内容创作者的桌面级 AI 生产工具，已实现付费客户落地）与 AI 内容管线平台（多模型编排 + 成本治理的自建基础设施）",
        "独立承担产品定义、技术选型、架构设计、研发交付与客户演示全链条，形成「成本可控、过程可审计、失败可局部重做」的 AI 产品设计方法论",
      ],
    },
    {
      company: "浩鲸云计算科技股份有限公司",
      position: "资深产品专家",
      period: "2017.06 — 2025.11",
      location: "中国",
      description: [
        "负责电信运营商核心资源管理 (OSS)、数据共享中台及网络运维产品的规划、设计与演进",
        "主导多个省级运营商的数字化转型项目，涵盖产品路标制定、需求分析管理、售前解决方案支撑及客户高层汇报",
      ],
    },
    {
      company: "优网科技",
      position: "产品 / 研发",
      period: "2009.09 — 2015.06",
      location: "中国",
      description: [
        "深耕无线网络优化领域，参与网优平台产品的需求分析与迭代设计，积累了扎实的数据分析与通信网络基础知识",
      ],
    },
    {
      company: "机械行业",
      position: "机械设计",
      period: "2006.06 — 2009.06",
      location: "中国",
      description: ["培养了严谨的工程逻辑思维与图纸/方案设计能力"],
    },
  ],

  projects: [
    {
      name: "无相 · AI 口播短视频生成器",
      period: "2026.06 — 至今",
      org: "创始人 / 产品负责人 · 独立产品（已商业化）",
      tech: [
        "LLM 编排",
        "数字人 / TTS / ASR",
        "文生图",
        "Tauri 桌面端",
        "FastAPI",
        "Remotion",
        "阿里云百炼",
        "火山方舟 Ark",
      ],
      description:
        "输入一段口播脚本与一张照片，自动产出带字幕、口型与动画插图的竖屏成片。桌面应用形态，脚本、素材、密钥与成片全部留在用户本机，无需服务器与显卡。",
      highlights: [
        {
          label: "产品定义",
          text: "定义「一键出片 + 逐镜精修」双模式，覆盖批量日更与重点内容打磨两类场景；内置 8 类镜头模板（钩子标题卡 / 对比图 / 信息图 / 数据卡 / 金句卡等）由 AI 按内容自动选型，画面文字全部由程序叠加而非模型绘制，根治 AI 出图错字问题。",
        },
        {
          label: "成本模型",
          text: "建立按量付费成本模型并完成实测验证：AI 生成成本约 ¥5/分钟，3 分钟成片总成本 ¥15.4，零显卡投入；相对外包代剪与订阅制工具形成数量级成本优势，成为核心卖点。",
        },
        {
          label: "成本护栏",
          text: "把 FinOps 产品化为四道护栏——付费前先预览、任务级预算上限自动熔断、失败只重做单个镜头、生成后逐项成本账单，将「账单失控」这一 AI 生产工具最大使用顾虑前置消除。",
        },
        {
          label: "商业落地",
          text: "输出客户演示路演材料（价值主张 / 竞品价格对标 / 部署与隐私方案）与交付支持体系，独立完成从产品定义到客户成交的全链条，已跑通付费交付闭环并产生实际营收。",
        },
        {
          label: "工程交付",
          text: "Tauri 2 桌面端 + 本机 FastAPI 服务 + Remotion 本地合成的可审计工作流架构；需求规格迭代至 v3.5，累计 2300+ 次提交与 760+ 个自动化测试，并对标头部知识类短视频账号建立画面与节拍基准。",
        },
      ],
      // TODO: 填入一条成片的公开链接（B站/视频号/抖音作品页），作为项目卡的作品展示入口
      link: "",
    },
    {
      name: "AI 内容管线与多模型编排平台",
      period: "2026.05 — 至今",
      org: "产品负责人 / 独立研发 · 自建 AI 基础设施",
      tech: ["ASR 语音转写", "多模型编排", "Gemini / Qwen", "配额与预算治理", "React 控制台", "FastAPI"],
      description:
        "把音视频课程内容自动转化为结构化知识资产的端到端管线，同时作为多模型编排、成本治理与评测方法论的试验场，支撑个人 AI 知识体系的持续输入。",
      highlights: [
        {
          label: "多模型编排",
          text: "SenseVoice 语音转写 + Gemini / Qwen 多模型内容综合，设计关键帧抽取与「转写—图文对齐」策略，累计处理 76 门课程、产出 232 篇结构化长文与 8000+ 次可追溯运行记录。",
        },
        {
          label: "模型评测",
          text: "设计并执行离线整段与流式分片双分支 A/B 实验（4.4 万字量级，RTF 0.062 vs 0.137），以实测数据而非直觉决定技术路线，形成可复用的评测报告口径。",
        },
        {
          label: "成本治理",
          text: "自研配额预算账本，覆盖 RPM/TPM/RPD 三维限制与各模型独立日额度，定义「逐次许可对应」的可验收口径，从机制上杜绝异常重试与默认开启的调用烧穿配额。",
        },
        {
          label: "可观测性",
          text: "自建 React 运维控制台（运行列表 / 配额看板 / 任务详情 / 成本仪表盘），把黑盒批处理变成可审计、可复盘、可恢复的流程。",
        },
      ],
      link: "",
    },
    {
      name: "AI 知识体系建设（M01—M12）",
      period: "2025.12 — 2026.08",
      org: "个人项目 · AI 产品经理知识重构",
      tech: ["知识工程", "RAG 方法论", "知识库治理", "脚本化自动维护"],
      description:
        "面向 AI 产品经理岗位能力模型，自建覆盖 12 个模块的系统化 AI 知识体系，并沉淀一套可长期增量维护的知识库治理方法。",
      highlights: [
        {
          label: "体系覆盖",
          text: "M01—M12 覆盖深度学习与表示学习、Transformer 与 LLM、提示词与上下文工程、Agent 工具调用与工作流、微调蒸馏与模型适配、多模态、工程化部署与成本、评估安全与治理、AI 产品方法与商业化、综合项目与职业应用，全部完成整模块验收。",
        },
        {
          label: "方法论",
          text: "提出并实践「搬运 ≠ 摄入」原则：确定性搬运全部交给脚本（零模型调用、可 24 小时连跑），认知加工只由真实问题驱动按需提级，避免「建了一堆无人使用的 wiki」这一知识库通病——该思路同样适用于企业 RAG 与知识中台建设。",
        },
        {
          label: "规模与治理",
          text: "沉淀 827 门课程来源、1600+ 篇笔记与 230 个概念页，配套查重、结构 lint、索引重建等治理脚本，知识库具备长期增量维护能力。",
        },
      ],
      link: "",
    },
    {
      name: "核心资源系统重构与数字化转型",
      period: "2021 — 2024",
      org: "产品负责人 · 北京/湖南/广西电信",
      tech: ["OSS", "GIS", "异构数据迁移", "资源管理", "去 IOE"],
      description:
        "担任产品负责人，主导多省电信核心资源系统去 IOE 及异厂家替换，实现新旧系统平滑割接与业务零中断。",
      highlights: [
        {
          label: "战略执行",
          text: "主导北京电信资源系统去 IOE 及异厂家替换（分四期上线），制定平滑迁移策略，实现新旧割接业务零中断、「一次性上线成功」。",
        },
        {
          label: "产品价值",
          text: "设计管线 GIS 与传输内外线一体化管理方案，显著提升一线人员资源维护效率与数据准确率。",
        },
        {
          label: "标准化",
          text: "提炼通用资源管理产品模型，将定制功能沉淀为基线版本，降低后续项目交付成本。",
        },
      ],
      link: "",
    },
    {
      name: "数据中台与能力开放产品线",
      period: "2021 — 2022",
      org: "北京/浙江电信",
      tech: ["数据中台", "API 开放", "元数据管理", "微服务"],
      description:
        "负责数据共享平台的产品架构设计，打通资源系统与周边多个业务系统的数据孤岛，促进运营商数据资产价值变现。",
      highlights: [
        {
          label: "产品规划",
          text: "负责数据共享平台产品架构设计，定义元数据管理及 API 接口标准，打通资源系统与周边 10+ 个业务系统的数据孤岛。",
        },
        {
          label: "商业落地",
          text: "通过精准痛点分析与方案推演，支撑浙江电信项目应标与落地，促进运营商数据资产价值变现。",
        },
      ],
      link: "",
    },
    {
      name: "智能运维与性能管理产品研发",
      period: "2019 — 2020",
      org: "研发中心/山东/上海",
      tech: ["性能管理", "告警监控", "定界定位算法", "GIS 可视化"],
      description:
        "主导资源中心性能管理系统的集中研发，并担任光网健康度分析等创新项目的售前顾问。",
      highlights: [
        {
          label: "产品创新",
          text: "主导资源中心「性能管理系统」集中研发，设计定界定位算法与性能指标监控体系，实现从「被动响应」到「主动预防」转变。",
        },
        {
          label: "售前攻坚",
          text: "输出具有竞争力的系统建设方案与原型规划，成功引导客户需求并促成项目立项。",
        },
        {
          label: "全景视图",
          text: "打造湖南电信「资源全视图」，通过可视化大屏与 GIS 技术提供全局资产监控与决策辅助。",
        },
      ],
      link: "",
    },
    {
      name: "GIS 与家客/集客应用支撑",
      period: "2018 — 2019",
      org: "江苏/内蒙移动",
      tech: ["GIS 管理平台", "家客/集客", "资源关联模型", "政企支撑"],
      description:
        "负责江苏移动 GIS 管理平台替换及内蒙移动家集客系统应标，深入调研一线业务场景，优化管线资源与客户资源关联模型，提升政企客户支撑响应速度。",
      highlights: [],
      link: "",
    },
  ],

  education: [
    {
      school: "北京邮电大学",
      degree: "工程管理 · 硕士",
      period: "2014.09 — 2017.06",
      gpa: "",
      honors: [],
    },
    {
      school: "河海大学",
      degree: "机械设计及自动化 · 学士",
      period: "2002.09 — 2006.06",
      gpa: "",
      honors: [],
    },
  ],

  certifications: [
    { name: "系统集成项目管理师", level: "中级职称" },
    { name: "IPMP 国际项目经理", level: "C 级认证" },
  ],
};
