export interface FakeBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  views: number;
}

export const fakeBlogPosts: FakeBlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Next.js 16: A Complete Guide",
    slug: "getting-started-nextjs-16",
    excerpt:
      "Learn how to build modern web applications with Next.js 16. We'll cover App Router, server components, and best practices.",
    content: `# Getting Started with Next.js 16

Next.js 16 brings incredible improvements to web development. In this guide, we'll explore:

## Key Features
- Server Components by default
- Improved App Router
- Built-in optimizations
- Streaming and Suspense

## Getting Started
To create a new Next.js project, run:
\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

## Key Concepts
### Server Components
Server Components allow you to write components that run only on the server. This reduces the JavaScript sent to the browser.

### App Router
The App Router is the new way to build Next.js applications, providing better routing capabilities.

## Best Practices
1. Use Server Components by default
2. Leverage Suspense for data loading
3. Optimize images with next/image
4. Use dynamic imports for code splitting
5. Implement proper error handling

## Conclusion
Next.js 16 makes it easier than ever to build fast, SEO-friendly web applications.`,
    cover_image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    author: {
      name: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      bio: "Senior Full Stack Developer",
    },
    category: "Web Development",
    tags: ["nextjs", "react", "javascript", "web-development"],
    publishedAt: "2024-12-01",
    updatedAt: "2024-12-01",
    readingTime: 8,
    views: 2450,
  },
  {
    id: "2",
    title: "React Server Components: What You Need to Know",
    slug: "react-server-components-guide",
    excerpt:
      "Understanding React Server Components and how they can improve your application's performance and user experience.",
    content: `# React Server Components: What You Need to Know

React Server Components (RSC) are a game-changer in how we build React applications.

## What are Server Components?
Server Components run exclusively on the server and don't add JavaScript to the client bundle.

## Benefits
- Reduced JavaScript bundle size
- Direct database access
- Secure API key handling
- Better performance
- Improved SEO

## When to Use
- Fetching data
- Accessing databases directly
- Handling sensitive information
- Large dependencies

## Example
\`\`\`jsx
async function Post({ id }) {
  const post = await db.query.posts.findFirst({
    where: { id }
  });
  
  return <div>{post.title}</div>;
}
\`\`\`

## Best Practices
1. Use Server Components by default
2. Use Client Components for interactivity
3. Keep components as small as possible
4. Leverage data caching

## Conclusion
Server Components represent the future of React development.`,
    cover_image:
      "https://images.unsplash.com/photo-1633356713697-e71af95b2370?w=800&q=80",
    author: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      bio: "React Expert & Open Source Contributor",
    },
    category: "React",
    tags: ["react", "server-components", "performance"],
    publishedAt: "2024-11-28",
    updatedAt: "2024-11-28",
    readingTime: 6,
    views: 1890,
  },
  {
    id: "3",
    title: "Mastering CSS-in-JS with Tailwind CSS",
    slug: "css-in-js-tailwind",
    excerpt:
      "A comprehensive guide to using Tailwind CSS for styling modern web applications with utility-first approach.",
    content: `# Mastering CSS-in-JS with Tailwind CSS

Tailwind CSS revolutionizes how we write styles for web applications.

## What is Tailwind CSS?
Tailwind is a utility-first CSS framework that helps you build designs without leaving your HTML.

## Why Tailwind?
- Rapid development
- Consistency
- Small file sizes
- Easy customization
- Great documentation

## Getting Started
Install Tailwind:
\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
\`\`\`

## Common Patterns
\`\`\`jsx
export function Card() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Card Title</h2>
      <p className="text-gray-600">Card content</p>
    </div>
  );
}
\`\`\`

## Advanced Features
- Responsive design with breakpoints
- Dark mode support
- Custom theme configuration
- Plugin system
- Performance optimization

## Conclusion
Tailwind CSS is essential for modern web development.`,
    cover_image:
      "https://images.unsplash.com/photo-1517694712842-ad6629082933?w=800&q=80",
    author: {
      name: "Mike Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      bio: "Frontend Specialist",
    },
    category: "CSS",
    tags: ["css", "tailwind", "styling", "frontend"],
    publishedAt: "2024-11-25",
    updatedAt: "2024-11-25",
    readingTime: 7,
    views: 3120,
  },
  {
    id: "4",
    title: "Database Design Best Practices for Scalability",
    slug: "database-design-best-practices",
    excerpt:
      "Learn how to design databases that can scale with your application as it grows.",
    content: `# Database Design Best Practices for Scalability

Designing a scalable database is crucial for growing applications.

## Key Principles
- Normalization
- Indexing
- Partitioning
- Caching
- Monitoring

## Database Types
### SQL Databases
- ACID compliance
- Structured data
- Relationships
- PostgreSQL, MySQL, SQL Server

### NoSQL Databases
- Document-based
- Flexible schema
- Horizontal scaling
- MongoDB, Firebase

## Optimization Strategies
1. Create appropriate indexes
2. Use proper data types
3. Normalize where appropriate
4. Plan for growth
5. Monitor performance

## Example Schema
\`\`\`sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_email ON users(email);
\`\`\`

## Conclusion
Good database design saves pain later.`,
    cover_image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    author: {
      name: "Emma Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      bio: "Database Architect",
    },
    category: "Database",
    tags: ["database", "sql", "scaling", "architecture"],
    publishedAt: "2024-11-22",
    updatedAt: "2024-11-22",
    readingTime: 9,
    views: 1650,
  },
  {
    id: "5",
    title: "Building APIs with Node.js and Express",
    slug: "nodejs-express-api",
    excerpt:
      "Create RESTful APIs using Node.js and Express with best practices and security considerations.",
    content: `# Building APIs with Node.js and Express

Building robust APIs is essential for modern applications.

## What is Express?
Express is a minimal and flexible Node.js web application framework.

## Getting Started
\`\`\`bash
npm init
npm install express
\`\`\`

## Basic API Server
\`\`\`javascript
const express = require('express');
const app = express();

app.get('/api/posts', (req, res) => {
  res.json({ posts: [] });
});

app.listen(3000);
\`\`\`

## Best Practices
- Use environment variables
- Implement error handling
- Add request validation
- Use middleware
- Write tests
- Document endpoints
- Implement rate limiting
- Use HTTPS

## Security
- Validate input
- Sanitize output
- Use authentication
- Implement authorization
- Keep dependencies updated

## Conclusion
Express makes API development straightforward.`,
    cover_image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    author: {
      name: "John Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      bio: "Backend Developer",
    },
    category: "Backend",
    tags: ["nodejs", "express", "api", "javascript"],
    publishedAt: "2024-11-20",
    updatedAt: "2024-11-20",
    readingTime: 8,
    views: 2100,
  },
  {
    id: "6",
    title: "Web Performance Optimization: Metrics That Matter",
    slug: "web-performance-optimization",
    excerpt:
      "Learn about Core Web Vitals and how to optimize your website for better performance and user experience.",
    content: `# Web Performance Optimization: Metrics That Matter

Performance is crucial for user experience and SEO.

## Core Web Vitals
### Largest Contentful Paint (LCP)
- Target: < 2.5s
- Measures loading performance

### First Input Delay (FID)
- Target: < 100ms
- Measures interactivity

### Cumulative Layout Shift (CLS)
- Target: < 0.1
- Measures visual stability

## Optimization Techniques
1. Minimize JavaScript
2. Optimize images
3. Use code splitting
4. Implement caching
5. Enable compression
6. Use CDN
7. Lazy load resources
8. Remove unused CSS

## Tools
- Google PageSpeed Insights
- Lighthouse
- WebPageTest
- GTmetrix

## Conclusion
Performance optimization is ongoing.`,
    cover_image:
      "https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=800&q=80",
    author: {
      name: "Lisa Anderson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      bio: "Performance Engineer",
    },
    category: "Performance",
    tags: ["performance", "web-vitals", "optimization", "seo"],
    publishedAt: "2024-11-18",
    updatedAt: "2024-11-18",
    readingTime: 7,
    views: 2800,
  },
];

export const categories = [
  "Web Development",
  "React",
  "CSS",
  "Database",
  "Backend",
  "Performance",
  "DevOps",
  "Mobile",
];

export const getAllTags = () => {
  const tags = new Set<string>();
  fakeBlogPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
};

export function searchPosts(query: string, category?: string) {
  return fakeBlogPosts.filter((post) => {
    const matchesQuery =
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));

    const matchesCategory = !category || post.category === category;

    return matchesQuery && matchesCategory;
  });
}

export function getPostBySlug(slug: string) {
  return fakeBlogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3) {
  const post = getPostBySlug(slug);
  if (!post) return [];

  return fakeBlogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, limit);
}
