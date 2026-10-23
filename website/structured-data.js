(function () {
    const siteUrl = 'https://djitt.co.uk';
    const currentPath = window.location.pathname || '/';
    const currentUrl = new URL(currentPath, siteUrl).toString();
    const pageTitle = document.title || 'DJITT';
    const descriptionMeta = document.querySelector('meta[name="description"]');
    const description = (descriptionMeta && descriptionMeta.getAttribute('content')) || 'Building Intelligent Systems That Scale Trust.';

    function buildEntityId(fragment) {
        return siteUrl + fragment;
    }

    const organization = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': buildEntityId('/#organization'),
        name: 'DJITT LTD',
        url: siteUrl,
        logo: buildEntityId('/assets/DjittLogoAug122026.png'),
        description: 'DJITT builds intelligent business systems, websites, acquisition systems, workflow systems and AI systems.',
        sameAs: [
            'https://djitt.co.uk/'
        ],
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'GB'
        }
    };

    const websiteEntity = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': buildEntityId('/#website'),
        url: siteUrl,
        name: 'DJITT',
        description: 'Building Intelligent Systems That Scale Trust',
        publisher: {
            '@id': buildEntityId('/#organization')
        },
        inLanguage: 'en-GB'
    };

    function makeBreadcrumbList(pathname) {
        const segments = pathname.split('/').filter(Boolean);
        const items = [{
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl + '/'
        }];

        let current = '';
        segments.forEach((segment, index) => {
            current += '/' + segment;
            const label = segment
                .replace(/[-_]+/g, ' ')
                .replace(/\.html$/i, '')
                .replace(/\b\w/g, char => char.toUpperCase());
            items.push({
                '@type': 'ListItem',
                position: index + 2,
                name: label,
                item: new URL(current + (current.endsWith('/') ? '' : '/'), siteUrl).toString().replace(/\/$/, '')
            });
        });

        return {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            '@id': buildEntityId('/#breadcrumb-' + (pathname === '/' ? 'home' : pathname.replace(/\//g, '-').replace(/\./g, '').replace(/-+$/, ''))),
            itemListElement: items
        };
    }

    function getPageSchema(pathname) {
        const normalizedPath = pathname === '/' ? '/' : pathname.replace(/index\.html$/i, '').replace(/\/$/, '') || '/';
        const pageId = normalizedPath === '/' ? '/#webpage-home' : '/#webpage-' + normalizedPath.replace(/\//g, '-').replace(/\./g, '').replace(/^-+|-+$/g, '');

        return {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': buildEntityId(pageId),
            url: currentUrl,
            name: pageTitle,
            description: description,
            isPartOf: {
                '@id': buildEntityId('/#website')
            },
            about: {
                '@id': buildEntityId('/#organization')
            },
            publisher: {
                '@id': buildEntityId('/#organization')
            },
            breadcrumb: {
                '@id': buildEntityId('/#breadcrumb-' + (normalizedPath === '/' ? 'home' : normalizedPath.replace(/\//g, '-').replace(/\./g, '').replace(/^-+|-+$/g, '')))
            }
        };
    }

    function getServiceSchemas() {
        const serviceNames = {
            '/front-door.html': 'DJITT Front Door',
            '/services.html': 'Platform & Services',
            '/websites/': 'DJITT Websites',
            '/websites/index.html': 'DJITT Websites'
        };

        const name = serviceNames[currentPath] || serviceNames[currentPath.replace(/index\.html$/, '')] || pageTitle;
        const serviceUrl = currentUrl;

        return [{
            '@context': 'https://schema.org',
            '@type': 'Service',
            '@id': buildEntityId('/#service-' + (currentPath === '/' ? 'home' : currentPath.replace(/\//g, '-').replace(/\./g, '').replace(/^-+|-+$/g, ''))),
            name: name,
            url: serviceUrl,
            provider: {
                '@id': buildEntityId('/#organization')
            },
            areaServed: 'United Kingdom',
            description: description,
            serviceType: 'Business systems, websites, client acquisition systems, workflow automation, and AI systems.'
        }];
    }

    function getArticleSchemas() {
        const articleHeading = document.querySelector('h1');
        const articleTitle = articleHeading ? articleHeading.textContent.trim() : pageTitle;

        return [{
            '@context': 'https://schema.org',
            '@type': 'Article',
            '@id': buildEntityId('/#article-' + (currentPath === '/' ? 'home' : currentPath.replace(/\//g, '-').replace(/\./g, '').replace(/^-+|-+$/g, ''))),
            headline: articleTitle,
            description: description,
            author: {
                '@type': 'Organization',
                name: 'DJITT LTD',
                '@id': buildEntityId('/#organization')
            },
            publisher: {
                '@id': buildEntityId('/#organization')
            },
            mainEntityOfPage: currentUrl,
            inLanguage: 'en-GB'
        }];
    }

    function buildSchemas() {
        const path = currentPath || '/';
        const pageSchema = getPageSchema(path);
        const breadcrumb = makeBreadcrumbList(path);
        const schemas = [organization, websiteEntity, pageSchema, breadcrumb];

        if (path.includes('/resources/') || path.includes('/insights/') || path.includes('/case-studies')) {
            schemas.push(...getArticleSchemas());
        }

        if (path.includes('/front-door') || path.includes('/services') || path.includes('/websites')) {
            schemas.push(...getServiceSchemas());
        }

        return schemas;
    }

    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.textContent = JSON.stringify(buildSchemas(), null, 0);
    document.head.appendChild(scriptTag);
})();
