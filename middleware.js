import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname, searchParams, origin } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // 检查任何路径上是否有token参数
  if (searchParams.has('token')) {
    const tokenFromUrl = searchParams.get('token');
    // 创建不带token参数的URL
    const newUrl = new URL(pathname, origin);

    // 复制除token外的所有参数
    searchParams.forEach((value, key) => {
      if (key !== 'token') {
        newUrl.searchParams.append(key, value);
      }
    });

    const response = NextResponse.redirect(newUrl);

    // 保存token到cookie
    response.cookies.set('token', tokenFromUrl, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7天有效期
    });

    return response;
  }

  // 原有的登录路径处理逻辑可以移除，因为已被上面的通用逻辑覆盖

  // 更新已有会话
  if (token) {
    const response = NextResponse.next();
    // 刷新 token 有效期
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 刷新为7天
    });

    return response;
  }

  // 保护需要 token 的路径
  const protectedPaths = ['/offer', '/mine', '/post'];
  const isProtected = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtected && !token) {
    // 重定向到登录页，并添加回调参数
    const callbackUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, origin));
  }

  // 默认放行
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',  // 匹配所有页面路径
  ],
};