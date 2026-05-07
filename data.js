// Comprehensive mock database for Job Portal & Preparation Website

const JOBS_DATA = [
  {
    id: "job-1",
    title: "Software Engineer I - Frontend",
    company: "Google",
    logo: "https://cdn-icons-png.flaticon.com/512/300/300221.png",
    location: "Bangalore, India (Hybrid)",
    salary: "₹18,00,000 - ₹24,00,000 / yr",
    type: "Full-time",
    experience: "1 - 3 years",
    skills: ["JavaScript", "React", "CSS Grid", "TypeScript", "Web Performance"],
    posted: "2 days ago",
    description: "Google is looking for a Frontend Engineer to join our Core Search UX team. You will build user-facing products, optimize web performance, and maintain a highly scalable visual framework used by millions of daily users.",
    requirements: [
      "Bachelor's degree in Computer Science, related technical field, or equivalent practical experience.",
      "1+ years of experience with web development, HTML/CSS, and advanced Javascript.",
      "Experience with modern web frameworks like React, Vue, or Angular.",
      "Understanding of web standards, semantic markup, and cross-browser compatibility."
    ]
  },
  {
    id: "job-2",
    title: "SDE - Backend",
    company: "Microsoft",
    logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
    location: "Hyderabad, India (Remote)",
    salary: "₹22,00,000 - ₹30,00,000 / yr",
    type: "Full-time",
    experience: "2+ years",
    skills: ["C#", ".NET Core", "Azure", "SQL Server", "System Design"],
    posted: "1 day ago",
    description: "Microsoft's Azure Cloud team is hiring a Backend Software Development Engineer. You will work on low-latency microservices, cloud scaling, and secure API gateways handling billions of requests.",
    requirements: [
      "Solid knowledge of object-oriented languages (C#, C++, or Java).",
      "Hands-on experience with SQL/NoSQL databases and data storage optimization.",
      "Familiarity with cloud platforms (Azure, AWS, or GCP).",
      "Strong problem-solving skills and expertise in Data Structures and Algorithms."
    ]
  },
  {
    id: "job-3",
    title: "React Developer",
    company: "Stripe",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968382.png",
    location: "Bangalore, India (On-site)",
    salary: "₹20,00,000 - ₹26,00,000 / yr",
    type: "Full-time",
    experience: "2 - 5 years",
    skills: ["React", "Redux", "TailwindCSS", "REST APIs", "Jest"],
    posted: "4 days ago",
    description: "Join Stripe's Payments Dashboard team. You will craft seamless interfaces that merchants around the world use to manage their business, integrate with payment systems, and visualize transactions.",
    requirements: [
      "Exceptional command of Javascript/TypeScript, modern React, and modern state management.",
      "Deep understanding of design systems and attention to visual detail.",
      "Experience writing robust unit and integration tests using Jest or Cypress.",
      "Ability to work collaboratively in a fast-paced product environment."
    ]
  },
  {
    id: "job-4",
    title: "Data Scientist",
    company: "Amazon",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968269.png",
    location: "Pune, India (Hybrid)",
    salary: "₹25,00,000 - ₹35,00,000 / yr",
    type: "Full-time",
    experience: "3+ years",
    skills: ["Python", "SQL", "Machine Learning", "Pandas", "AWS"],
    posted: "Just now",
    description: "Amazon's Personalization team is seeking a talented Data Scientist. You will design, train, and deploy machine learning models to improve personalized shopping recommendations across the global catalog.",
    requirements: [
      "Master's or Ph.D. in Statistics, Computer Science, Mathematics, or equivalent quantitative field.",
      "Proficiency in Python, SQL, and common ML libraries (Scikit-Learn, TensorFlow, PyTorch).",
      "Experience designing A/B experiments and analyzing statistical results.",
      "Strong communication skills to explain complex model behaviors to business partners."
    ]
  },
  {
    id: "job-5",
    title: "Frontend Intern",
    company: "Netflix",
    logo: "https://cdn-icons-png.flaticon.com/512/5977/5977590.png",
    location: "Mumbai, India (Hybrid)",
    salary: "₹80,000 - ₹1,20,000 / mo",
    type: "Internship",
    experience: "Fresher",
    skills: ["HTML5", "CSS3", "JavaScript", "React Basics"],
    posted: "3 hours ago",
    description: "Netflix is looking for passionate engineering interns to join our Content Engineering department for a 6-month program. Get ready to work on internal workflows and streaming metrics portals.",
    requirements: [
      "Currently pursuing a Bachelor's/Master's degree in Computer Science or related fields.",
      "Strong understanding of core JavaScript, responsive design, and CSS animations.",
      "Familiarity with modern front-end workflows (Git, Webpack, React).",
      "Eagerness to learn and collaborate with highly talented senior mentors."
    ]
  },
  {
    id: "job-6",
    title: "DevOps Engineer",
    company: "Meta",
    logo: "https://cdn-icons-png.flaticon.com/512/6033/6033716.png",
    location: "Remote (India)",
    salary: "₹28,00,000 - ₹38,00,000 / yr",
    type: "Full-time",
    experience: "4+ years",
    skills: ["Docker", "Kubernetes", "CI/CD", "Terraform", "AWS"],
    posted: "5 days ago",
    description: "Meta is seeking a DevOps Engineer to optimize infrastructure scaling and automate deployment pipelines for high-traffic social application modules. Help us bridge the gap between code and reliable, robust deployments.",
    requirements: [
      "Strong experience managing Kubernetes clusters and Dockerized microservices.",
      "Expertise in Infrastructure as Code (IaC) using Terraform or CloudFormation.",
      "Deep understanding of Linux systems, bash scripting, and networking protocols.",
      "Hands-on experience with CI/CD tools (Jenkins, GitHub Actions, or GitLab CI)."
    ]
  }
];

const PREPARATION_DATA = {
  aptitude: [
    {
      id: "apt-1",
      title: "Quantitative Aptitude: Percentages",
      notes: `
### Key Concepts & Formulas
- **Percentage Formula**: $\\text{Percentage (\\%)} = \\frac{\\text{Value}}{\\text{Total Value}} \\times 100$
- **Percentage Increase**: $\\frac{\\text{New Value} - \\text{Old Value}}{\\text{Old Value}} \\times 100$
- **Percentage Decrease**: $\\frac{\\text{Old Value} - \\text{New Value}}{\\text{Old Value}} \\times 100$
- **Multiplying Factors**: 
  - To increase a number by $20\\%$, multiply it by $1.20$.
  - To decrease a number by $15\\%$, multiply it by $0.85$.

#### Quick Tips
1. **$x\\%$ of $y$ is equal to $y\\%$ of $x$**. This simplifies mental math (e.g., $16\\%$ of $50$ is the same as $50\\%$ of $16 = 8$).
2. **Successive Percent Changes**: If a value changes by $A\\%$ and then by $B\\%$, the net change is:
   $$\\text{Net Change} = \\left( A + B + \\frac{A \\times B}{100} \\right)\\%$$
      `,
      quiz: [
        {
          question: "If A's salary is 25% more than B's salary, then by what percentage is B's salary less than A's salary?",
          options: ["15%", "20%", "25%", "33.33%"],
          answer: 1, // index of "20%"
          explanation: "Let B's salary be 100. Then A's salary is 125. B's salary is less than A's by (25 / 125) * 100 = 20%."
        },
        {
          question: "A fruit seller had some apples. He sells 40% apples and still has 420 apples. Originally, he had how many apples?",
          options: ["588 apples", "600 apples", "700 apples", "720 apples"],
          answer: 2, // 700 apples
          explanation: "Since he sold 40%, 60% of apples remain. 60% of Total = 420. Total = (420 * 100) / 60 = 700 apples."
        },
        {
          question: "A number is increased by 20% and then decreased by 20%. What is the net change?",
          options: ["No change", "4% decrease", "4% increase", "2% decrease"],
          answer: 1, // 4% decrease
          explanation: "Using Net Change formula: 20 - 20 + (20 * -20)/100 = 0 - 4 = -4%. Thus, a 4% decrease."
        }
      ]
    },
    {
      id: "apt-2",
      title: "Logical Reasoning: Syllogisms",
      notes: `
### Understanding Syllogisms
Syllogisms consist of logical statements (Premises) leading to a Conclusion. 
Use **Venn Diagrams** to analyze and determine the validity of the conclusions.

#### Standard Proposition Types
- **Universal Affirmative (All A are B)**: represented as a smaller circle A entirely inside circle B.
- **Universal Negative (No A are B)**: separate, non-overlapping circles A and B.
- **Particular Affirmative (Some A are B)**: partially overlapping circles A and B.
- **Particular Negative (Some A are not B)**: shows that at least some portion of A is completely outside B.

#### Rule of Thumb
Always draw the **least overlapping (minimal) Venn Diagram** to test conclusions. A conclusion is valid if and only if it holds true in **all possible** diagram configurations.
      `,
      quiz: [
        {
          question: "Statements: All poets are singers. No singer is an actor. Conclusions: (I) No poet is an actor. (II) Some singers are poets.",
          options: [
            "Only conclusion I follows",
            "Only conclusion II follows",
            "Both I and II follow",
            "Neither I nor II follows"
          ],
          answer: 2, // Both I and II follow
          explanation: "Since all poets are singers and no singer is an actor, no poet can be an actor (Conclusion I follows). Since all poets are singers, some singers are definitely poets (Conclusion II follows)."
        },
        {
          question: "Statements: Some keys are locks. Some locks are drawers. Conclusions: (I) Some keys are drawers. (II) No key is a drawer.",
          options: [
            "Only conclusion I follows",
            "Only conclusion II follows",
            "Either I or II follows",
            "Neither I nor II follows"
          ],
          answer: 2, // Either I or II follows
          explanation: "This is a complementary pair. Since 'keys' and 'drawers' are not directly related in the minimal Venn Diagram, either they overlap (Some keys are drawers) or they do not (No key is a drawer). One of them must be true."
        }
      ]
    }
  ],
  technical: [
    {
      id: "tech-1",
      title: "Database Management Systems (DBMS)",
      notes: `
### Crucial DBMS Topics for Interviews
- **ACID Properties**:
  - **Atomicity**: The entire transaction takes place at once or doesn't happen at all (All-or-Nothing).
  - **Consistency**: Database must remain consistent before and after transactions.
  - **Isolation**: Multiple transactions occur concurrently without interference.
  - **Durability**: Successful transactions persist in non-volatile memory even in system failures.

- **Keys in Relational Database**:
  - **Primary Key**: Unique, non-null identifier for a record.
  - **Foreign Key**: Establishes a link between data in two tables (ensures referential integrity).
  - **Super Key**: Set of one or more attributes that uniquely identify records.
  - **Candidate Key**: Minimal Super Key.

- **Normal Forms (Normalization)**:
  - **1NF**: Atomic values, no repeating groups.
  - **2NF**: In 1NF + no partial dependency (all non-prime attributes must fully depend on candidate keys).
  - **3NF**: In 2NF + no transitive dependencies.
  - **BCNF**: Stronger than 3NF; for every dependency $X \\rightarrow Y$, $X$ must be a super key.
      `,
      quiz: [
        {
          question: "Which normal form is based on the concept of transitive dependency?",
          options: ["1NF", "2NF", "3NF", "BCNF"],
          answer: 2, // 3NF
          explanation: "3NF is designed to remove transitive dependencies (i.e., when a non-prime attribute depends on another non-prime attribute)."
        },
        {
          question: "What is the 'I' in ACID properties of transaction management?",
          options: ["Integration", "Isolation", "Immutability", "Indexing"],
          answer: 1, // Isolation
          explanation: "Isolation ensures that execution of concurrent transactions does not lead to state conflicts, treating each transaction as if it runs in isolation."
        }
      ]
    },
    {
      id: "tech-2",
      title: "Operating Systems (OS)",
      notes: `
### Core OS Concepts for Tech Rounds
- **Process vs. Thread**:
  - A **Process** is an executing instance of an application (has its own memory space).
  - A **Thread** is a lightweight path of execution inside a process (shares memory with sister threads).

- **Deadlocks**:
  Four conditions must hold simultaneously for a deadlock to occur:
  1. **Mutual Exclusion**: Only one process can use a resource at a time.
  2. **Hold and Wait**: Process holding resources can request additional ones.
  3. **No Preemption**: Resources cannot be forcibly taken from a process.
  4. **Circular Wait**: A closed loop of processes waiting for each other's resources.

- **Virtual Memory & Page Replacement**:
  - Simulates extra physical RAM by utilizing storage disk blocks.
  - **LRU (Least Recently Used)**: Replaces page that has not been accessed for the longest time.
      `,
      quiz: [
        {
          question: "Which of the following is NOT one of the four necessary conditions for deadlock?",
          options: ["Mutual Exclusion", "Hold and Wait", "Preemption allowed", "Circular Wait"],
          answer: 2, // Preemption allowed
          explanation: "The actual condition is 'No Preemption', meaning resources cannot be taken away until the process releases them."
        },
        {
          question: "Where do threads belonging to the same process share resources?",
          options: ["Heap and Code segment", "Stack only", "Registers only", "None of the above"],
          answer: 0, // Heap and Code segment
          explanation: "Threads of a process share the same Heap, global variables, and Address/Code space, but have their own separate Stack and Program Counter (Registers)."
        }
      ]
    }
  ],
  hr: [
    {
      id: "hr-1",
      title: "Mastering HR Interview Questions",
      notes: `
### The STAR Method for Behavioral Questions
When asked situational questions like *"Tell me about a time you failed..."*, structure your answer using **STAR**:
- **S - Situation**: Set the context. Describe the challenge or event clearly.
- **T - Task**: Describe what your responsibility was in that situation.
- **A - Action**: Explain the precise actions *you* took to address the task. Keep focus on your contributions.
- **R - Result**: Share the outcomes, achievements, lessons learned, and quantitative metrics if possible.

---

### Question 1: "Tell me about yourself."
- **Formula**: Present (What you do now) $\\rightarrow$ Past (Experience/Major projects) $\\rightarrow$ Future (Why this specific company matches your goals).
- **Tip**: Keep it under 2 minutes. Do not read your resume; instead, tell a story highlighting your core strengths.

### Question 2: "What is your greatest weakness?"
- **Formula**: Select a genuine professional weakness $\\rightarrow$ Explain how you recognize it $\\rightarrow$ Describe the **actionable steps** you are currently taking to improve.
- **Example**: *"I used to struggle with public speaking, so I joined a local Toastmasters club and volunteered to present our team's monthly sprint reviews. It helped me build significant confidence."*
      `,
      quiz: [
        {
          question: "What does the 'R' stand for in the 'STAR' methodology?",
          options: ["Responsibility", "Review", "Result", "Reasoning"],
          answer: 2, // Result
          explanation: "Result describes the final outcome, what you achieved, what you learned, and how it benefited the project/team."
        },
        {
          question: "Which is the best approach when answering 'What are your salary expectations?' as a fresher?",
          options: [
            "State a high specific number to show confidence.",
            "Say 'I don't care about money, just the experience'.",
            "Quote a research-backed range and express openness based on total compensation and growth.",
            "Refuse to answer until they make an offer."
          ],
          answer: 2,
          explanation: "Providing a researched range showing flexibility maintains your market value while showing you are cooperative and reasonable."
        }
      ]
    }
  ]
};

const DSA_SHEET_DATA = [
  {
    topic: "Arrays",
    slug: "arrays",
    problems: [
      {
        id: "dsa-arr-1",
        title: "Two Sum",
        difficulty: "Easy",
        statement: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        examples: [
          "Input: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1]."
        ],
        templates: {
          javascript: `function twoSum(nums, target) {\n    // Write your code here\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}`,
          python: `def twoSum(nums, target):\n    # Write your code here\n    hash_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in hash_map:\n            return [hash_map[complement], i]\n        hash_map[num] = i\n    return []`,
          cpp: `#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> mp;\n    for(int i = 0; i < nums.size(); ++i) {\n        int comp = target - nums[i];\n        if(mp.count(comp)) return {mp[comp], i};\n        mp[nums[i]] = i;\n    }\n    return {};\n}`
        },
        testCases: [
          { input: "nums = [2,7,11,15], target = 9", expected: "[0, 1]" },
          { input: "nums = [3,2,4], target = 6", expected: "[1, 2]" }
        ]
      },
      {
        id: "dsa-arr-2",
        title: "Maximum Subarray (Kadane's Algorithm)",
        difficulty: "Medium",
        statement: "Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
        examples: [
          "Input: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\nOutput: 6\nExplanation: [4, -1, 2, 1] has the largest sum = 6."
        ],
        templates: {
          javascript: `function maxSubArray(nums) {\n    let maxSoFar = nums[0];\n    let currMax = nums[0];\n    for (let i = 1; i < nums.length; i++) {\n        currMax = Math.max(nums[i], currMax + nums[i]);\n        maxSoFar = Math.max(maxSoFar, currMax);\n    }\n    return maxSoFar;\n}`,
          python: `def maxSubArray(nums):\n    max_so_far = nums[0]\n    curr_max = nums[0]\n    for i in range(1, len(nums)):\n        curr_max = max(nums[i], curr_max + nums[i])\n        max_so_far = max(max_so_far, curr_max)\n    return max_so_far`
        },
        testCases: [
          { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", expected: "6" },
          { input: "nums = [1]", expected: "1" }
        ]
      }
    ]
  },
  {
    topic: "Strings",
    slug: "strings",
    problems: [
      {
        id: "dsa-str-1",
        title: "Valid Palindrome",
        difficulty: "Easy",
        statement: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.",
        examples: [
          "Input: s = \"A man, a plan, a canal: Panama\"\nOutput: true\nExplanation: \"amanaplanacanalpanama\" is a palindrome."
        ],
        templates: {
          javascript: `function isPalindrome(s) {\n    const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n    return clean === clean.split('').reverse().join('');\n}`,
          python: `def isPalindrome(s):\n    clean = "".join(char.lower() for char in s if char.isalnum())\n    return clean == clean[::-1]`
        },
        testCases: [
          { input: "s = \"A man, a plan, a canal: Panama\"", expected: "true" },
          { input: "s = \"race a car\"", expected: "false" }
        ]
      }
    ]
  },
  {
    topic: "Linked Lists",
    slug: "linked-lists",
    problems: [
      {
        id: "dsa-ll-1",
        title: "Reverse a Linked List",
        difficulty: "Medium",
        statement: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
        examples: [
          "Input: head = [1, 2, 3, 4, 5]\nOutput: [5, 4, 3, 2, 1]"
        ],
        templates: {
          javascript: `function reverseList(head) {\n    let prev = null;\n    let curr = head;\n    while (curr) {\n        let nextTemp = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = nextTemp;\n    }\n    return prev;\n}`,
          python: `def reverseList(head):\n    prev = None\n    curr = head\n    while curr:\n        next_temp = curr.next\n        curr.next = prev\n        prev = curr\n        curr = next_temp\n    return prev`
        },
        testCases: [
          { input: "head = [1,2,3,4,5]", expected: "[5,4,3,2,1]" }
        ]
      }
    ]
  },
  {
    topic: "Dynamic Programming",
    slug: "dp",
    problems: [
      {
        id: "dsa-dp-1",
        title: "Climbing Stairs",
        difficulty: "Easy",
        statement: "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        examples: [
          "Input: n = 3\nOutput: 3\nExplanation: There are three ways:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step"
        ],
        templates: {
          javascript: `function climbStairs(n) {\n    if (n <= 2) return n;\n    let first = 1, second = 2;\n    for (let i = 3; i <= n; i++) {\n        let third = first + second;\n        first = second;\n        second = third;\n    }\n    return second;\n}`,
          python: `def climbStairs(n):\n    if n <= 2:\n        return n\n    first, second = 1, 2\n    for i in range(3, n + 1):\n        third = first + second\n        first = second\n        second = third\n    return second`
        },
        testCases: [
          { input: "n = 2", expected: "2" },
          { input: "n = 3", expected: "3" }
        ]
      }
    ]
  }
];

const COMPANIES_DATA = [
  {
    id: "comp-google",
    name: "Google",
    logo: "https://cdn-icons-png.flaticon.com/512/300/300221.png",
    accent: "#4285f4",
    eligibility: {
      degree: "B.E. / B.Tech / M.Tech / MCA in CS/IT or equivalent",
      cgpa: "6.5+ CGPA or 65% with no active backlogs"
    },
    examPattern: {
      duration: "45-60 mins per round",
      sections: [
        { name: "Online Assessment", details: "2 Coding questions based on Medium-Hard DSA (Trees, Graphs, DP)." },
        { name: "Technical Interview Rounds (3-4)", details: "Deconstructs data structures, algorithms, space-time complexities, and robust systems design." },
        { name: "Googleyness & Leadership Round (1)", details: "Behavioral assessment checking alignment with Google's code of conduct and core values." }
      ]
    },
    syllabus: [
      "Advanced Graph Algorithms (Dijkstra, MST, BFS, DFS)",
      "Dynamic Programming (Multidimensional state optimization)",
      "System Design (Scalability, Load Balancing, Caching, Databases)",
      "Complex Trees (Tries, Segment Trees, AVL Trees)"
    ],
    timeline: [
      { step: "Step 1", title: "Online Assessment", desc: "Shortlist based on DSA screening test." },
      { step: "Step 2", title: "Technical Screen", desc: "Deep-dive algorithms round over video." },
      { step: "Step 3", title: "Onsite Rounds", desc: "3 individual code rounds + 1 System Design (for L4+)." },
      { step: "Step 4", title: "Googleyness Round", desc: "Assesses behavioral, cultural, and leadership fit." },
      { step: "Step 5", title: "Hiring Committee", desc: "Final decision after package evaluation." }
    ]
  },
  {
    id: "comp-microsoft",
    name: "Microsoft",
    logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
    accent: "#f25022",
    eligibility: {
      degree: "B.Tech / M.Tech / MS in CS / IT / ECE or equivalent",
      cgpa: "7.0+ CGPA or 70% in 10th, 12th, and Graduation"
    },
    examPattern: {
      duration: "45 mins per technical round",
      sections: [
        { name: "Codility Test", details: "3 Coding questions in 110 minutes (Easy, Medium, Hard problems)." },
        { name: "Technical Interview (2-3 Rounds)", details: "Focuses on clean production-ready code, pointers, linked lists, and trees." },
        { name: "System Design & Asappropriate Round", desc: "Analyzes system planning and team coordination." }
      ]
    },
    syllabus: [
      "Linked Lists & Pointers manipulation",
      "Binary Trees & Tree Traversals",
      "Hashing, Heap & Sorting algorithms",
      "System Architecture and Object-Oriented Design (OOD)"
    ],
    timeline: [
      { step: "Step 1", title: "Resume Screening", desc: "Academic and project shortlisting." },
      { step: "Step 2", title: "Coding Challenge", desc: "Timed online platform exam on Codility." },
      { step: "Step 3", title: "Technical Rounds", desc: "Pointers, dynamic programming, and memory allocation." },
      { step: "Step 4", title: "AA Round (As Appropriate)", desc: "Senior director evaluation of behavioral alignment and technical breadth." }
    ]
  },
  {
    id: "comp-amazon",
    name: "Amazon",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968269.png",
    accent: "#ff9900",
    eligibility: {
      degree: "B.Tech / M.Tech / MCA / M.Sc in CS or related field",
      cgpa: "6.0+ CGPA with no active backlogs"
    },
    examPattern: {
      duration: "Online Test: 90 mins, Interviews: 60 mins each",
      sections: [
        { name: "Online Assessment", details: "2 Coding problems + 1 Work Style Assessment + 1 Reasoning test." },
        { name: "Technical Rounds (3)", details: "Highly focused on Leadership Principles (50%) and DSA (50%)." },
        { name: "Bar Raiser Round", details: "Strict standard assessment on system scaling and overall architecture." }
      ]
    },
    syllabus: [
      "Amazon's 16 Leadership Principles (Absolute Must)",
      "Arrays, String manipulation & HashMaps",
      "Dynamic Programming, Backtracking, Graphs",
      "System Design & Object-Oriented Programming (OOPS)"
    ],
    timeline: [
      { step: "Step 1", title: "Online Assessment", desc: "Logical reasoning and coding challenges." },
      { step: "Step 2", title: "Tech Round 1 & 2", desc: "Data structures questions integrated with Leadership questions." },
      { step: "Step 3", title: "System Design", desc: "High-level/Low-level system architecture." },
      { step: "Step 4", title: "Bar Raiser Round", desc: "Objective evaluation by an external certified interviewer." }
    ]
  },
  {
    id: "comp-tcs",
    name: "TCS (Digital / Ninja)",
    logo: "https://cdn-icons-png.flaticon.com/512/5969/5969134.png",
    accent: "#00539f",
    eligibility: {
      degree: "B.E. / B.Tech / M.E. / M.Tech / MCA / M.Sc",
      cgpa: "6.0 CGPA or 60% throughout 10th, 12th, and College"
    },
    examPattern: {
      duration: "TCS NQT: 180 mins",
      sections: [
        { name: "Foundation Section", details: "Numerical Ability, Verbal Ability, Reasoning Ability." },
        { name: "Advanced Section", details: "Advanced Quantitative, Advanced Reasoning, 2 Coding Questions." },
        { name: "Technical & HR Interview", details: "Review of major academic projects, DBMS, basic OOPS, and resume checks." }
      ]
    },
    syllabus: [
      "Quantitative Aptitude (Percentages, Time & Work, Profit & Loss)",
      "Basic Coding (Arrays, String operations, basic loops)",
      "Fundamental OOPS, SQL queries, and Software Engineering",
      "Resume & Academic Projects review"
    ],
    timeline: [
      { step: "Step 1", title: "NQT Registration", desc: "Apply via TCS NextStep Portal." },
      { step: "Step 2", title: "National Qualifier Test", desc: "Aptitude and basic coding test." },
      { step: "Step 3", title: "Interview Call", desc: "Combined Technical, Managerial, and HR Round." }
    ]
  }
];
