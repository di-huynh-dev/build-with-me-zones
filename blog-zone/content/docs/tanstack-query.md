---
title: "TanStack Query (React Query)"
description: "Hướng dẫn cài đặt và sử dụng TanStack Query cho quản lý state và data fetching trong React"
order: 1
sidebar_label: "TanStack Query"
category: "Tanstack"
---

# TanStack Query (React Query)

TanStack Query (trước đây là React Query) là thư viện mạnh mẽ để quản lý server state trong React applications. Nó giúp bạn fetch, cache, synchronize và update server state một cách dễ dàng.

## Tại sao nên dùng TanStack Query?

- **Caching thông minh**: Tự động cache data và reuse khi có thể
- **Background Updates**: Tự động refetch data trong background
- **Optimistic Updates**: Update UI ngay lập tức trước khi API response
- **Pagination & Infinite Scroll**: Built-in support
- **Devtools**: React Query Devtools để debug
- **TypeScript Support**: Type-safe queries

## Cài đặt

### Với npm

```bash
npm install @tanstack/react-query
```

### Với bun

```bash
bun add @tanstack/react-query
```

### Với yarn

```bash
yarn add @tanstack/react-query
```

## Setup cơ bản

### 1. Tạo Query Client và Provider

Tạo file `lib/query-client.ts`:

```typescript
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes (cacheTime deprecated)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

### 2. Wrap App với QueryClientProvider

Trong `app/layout.tsx` hoặc root layout:

```tsx
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
```

:::note
Với Next.js App Router, bạn cần tạo Client Component wrapper vì QueryClientProvider là client component.
:::

### 3. Tạo Client Component Wrapper

Tạo file `components/providers/query-provider.tsx`:

```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

Sau đó import vào layout:

```tsx
import { QueryProvider } from "@/components/providers/query-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
```

## Basic Queries - useQuery

### Fetch Data đơn giản

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
}

export function PostsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json() as Promise<Post[]>;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
```

### Query với Parameters

```tsx
interface PostDetailProps {
  postId: number;
}

export function PostDetail({ postId }: PostDetailProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["post", postId], // Include params in queryKey
    queryFn: async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      return res.json() as Promise<Post>;
    },
    enabled: postId > 0, // Only run when postId is valid
  });

  if (isLoading) return <div>Loading post...</div>;

  return (
    <div>
      <h2>{data?.title}</h2>
      <p>{data?.body}</p>
    </div>
  );
}
```

### Dependent Queries

```tsx
export function UserPosts({ userId }: { userId: number }) {
  // Fetch user first
  const { data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await fetch(`/api/users/${userId}`);
      return res.json();
    },
  });

  // Fetch posts only when user is loaded
  const { data: posts } = useQuery({
    queryKey: ["posts", user?.id],
    queryFn: async () => {
      const res = await fetch(`/api/posts?userId=${user.id}`);
      return res.json();
    },
    enabled: !!user, // Only run when user exists
  });

  return <div>{/* Render posts */}</div>;
}
```

## Mutations - useMutation

### POST Request

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function CreatePostForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newPost: { title: string; body: string }) => {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      return res.json();
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate({
      title: formData.get("title") as string,
      body: formData.get("body") as string,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" required />
      <textarea name="body" placeholder="Body" required />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Creating..." : "Create Post"}
      </button>
      {mutation.isError && <div>Error: {mutation.error.message}</div>}
      {mutation.isSuccess && <div>Post created!</div>}
    </form>
  );
}
```

### Optimistic Updates

```tsx
export function LikeButton({ postId }: { postId: number }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (liked: boolean) => {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
        body: JSON.stringify({ liked }),
      });
      return res.json();
    },
    onMutate: async (newLiked) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["post", postId] });

      // Snapshot previous value
      const previousPost = queryClient.getQueryData(["post", postId]);

      // Optimistically update
      queryClient.setQueryData(["post", postId], (old: any) => ({
        ...old,
        liked: newLiked,
        likes: newLiked ? old.likes + 1 : old.likes - 1,
      }));

      // Return context with previous value
      return { previousPost };
    },
    onError: (err, newLiked, context) => {
      // Rollback on error
      queryClient.setQueryData(["post", postId], context?.previousPost);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });

  return (
    <button onClick={() => mutation.mutate(!data.liked)}>
      {data.liked ? "Unlike" : "Like"} ({data.likes})
    </button>
  );
}
```

## Pagination

### Basic Pagination

```tsx
import { useState } from "react";

export function PaginatedPosts() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["posts", page],
    queryFn: async () => {
      const res = await fetch(`/api/posts?page=${page}&limit=10`);
      return res.json();
    },
    placeholderData: (previousData) => previousData, // Keep previous data while fetching
  });

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.posts.map((post) => (
            <div key={post.id}>{post.title}</div>
          ))}
        </div>
      )}

      <div>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((old) => old + 1)}
          disabled={isPlaceholderData || !data?.hasMore}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

### Infinite Scroll

```tsx
import { useInfiniteQuery } from "@tanstack/react-query";

export function InfinitePosts() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", "infinite"],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await fetch(`/api/posts?page=${pageParam}&limit=10`);
        return res.json();
      },
      getNextPageParam: (lastPage, pages) => {
        return lastPage.hasMore ? pages.length + 1 : undefined;
      },
      initialPageParam: 1,
    });

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.posts.map((post) => (
            <div key={post.id}>{post.title}</div>
          ))}
        </div>
      ))}

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
    </div>
  );
}
```

## Custom Hooks Pattern

### Tạo Custom Query Hooks

Tạo file `hooks/use-posts.ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
}

// Get all posts
export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("/api/posts");
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json() as Promise<Post[]>;
    },
  });
}

// Get single post
export function usePost(id: number) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await fetch(`/api/posts/${id}`);
      if (!res.ok) throw new Error("Failed to fetch post");
      return res.json() as Promise<Post>;
    },
    enabled: id > 0,
  });
}

// Create post
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPost: Omit<Post, "id">) => {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

// Update post
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Post> & { id: number }) => {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      return res.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", variables.id] });
    },
  });
}

// Delete post
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
```

### Sử dụng Custom Hooks

```tsx
import { usePosts, useCreatePost, useDeletePost } from "@/hooks/use-posts";

export function PostsManager() {
  const { data: posts, isLoading } = usePosts();
  const createPost = useCreatePost();
  const deletePost = useDeletePost();

  const handleCreate = () => {
    createPost.mutate({
      title: "New Post",
      body: "Post content",
    });
  };

  const handleDelete = (id: number) => {
    deletePost.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={handleCreate}>Create Post</button>
      {posts?.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

## Best Practices

### 1. Query Keys Structure

```typescript
// ❌ Bad - không consistent
queryKey: ["posts"];
queryKey: ["post", id];
queryKey: ["user-posts", userId];

// ✅ Good - consistent structure
queryKey: ["posts"];
queryKey: ["posts", id];
queryKey: ["posts", "user", userId];
queryKey: ["posts", "search", { query, page }];
```

### 2. Error Handling

```tsx
export function PostsWithErrorHandling() {
  const { data, error, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  if (isError) {
    return (
      <div className="error-container">
        <h3>Failed to load posts</h3>
        <p>{error.message}</p>
        <button onClick={() => refetch()}>Try Again</button>
      </div>
    );
  }

  // ...
}
```

### 3. Loading States

```tsx
export function PostsWithLoadingStates() {
  const { data, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return (
    <div>
      {isLoading && <div>Initial loading...</div>}
      {isRefetching && !isLoading && <div className="refetch-indicator">↻</div>}

      {data && (
        <div className={isFetching ? "opacity-50" : ""}>
          {/* Render posts */}
        </div>
      )}
    </div>
  );
}
```

### 4. Prefetching

```tsx
import { useQueryClient } from "@tanstack/react-query";

export function PostsList() {
  const queryClient = useQueryClient();

  const handleMouseEnter = (postId: number) => {
    // Prefetch post detail when hovering
    queryClient.prefetchQuery({
      queryKey: ["post", postId],
      queryFn: () => fetchPost(postId),
      staleTime: 60 * 1000,
    });
  };

  return (
    <div>
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          onMouseEnter={() => handleMouseEnter(post.id)}
        >
          {post.title}
        </Link>
      ))}
    </div>
  );
}
```

## Query Configuration

### Global Default Options

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // Consider data fresh for 1 minute
      gcTime: 5 * 60 * 1000, // Keep unused data in cache for 5 minutes
      retry: 3, // Retry failed requests 3 times
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      refetchOnReconnect: true, // Refetch when internet connection is restored
      refetchOnMount: true, // Refetch when component mounts
    },
    mutations: {
      retry: 0, // Don't retry mutations by default
    },
  },
});
```

## DevTools

### Cài đặt DevTools

```bash
bun add @tanstack/react-query-devtools
```

### Sử dụng DevTools

```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}
```

## Tài liệu tham khảo

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [React Query v5 Migration Guide](https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5)
- [Query Key Factory Pattern](https://tkdodo.eu/blog/effective-react-query-keys)
- [React Query Best Practices](https://tkdodo.eu/blog/practical-react-query)

## Kết luận

TanStack Query giúp quản lý server state một cách hiệu quả với:

- Automatic caching và background updates
- Powerful refetching strategies
- Built-in optimistic updates
- TypeScript support tốt
- Excellent developer experience với DevTools

Hãy bắt đầu với các ví dụ cơ bản và dần dần áp dụng các patterns nâng cao khi project của bạn phát triển!
