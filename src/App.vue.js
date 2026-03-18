import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import { Menu, Close } from "@element-plus/icons-vue";
const route = useRoute();
const router = useRouter();
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);
// 提取导航配置，符合 DRY (Don't Repeat Yourself) 原则，方便后期维护
const navItems = [
    { path: "/", label: "首页" },
    { path: "/chat", label: "Deepseek 对话" },
    { path: "/stream", label: "流式输出" },
    { path: "/image", label: "图像生成" },
];
// 监听路由变化，自动收起移动端菜单
watch(() => route.path, () => {
    isMobileMenuOpen.value = false;
});
const toggleMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
const closeMenu = () => {
    if (isMobileMenuOpen.value) {
        isMobileMenuOpen.value = false;
    }
};
// 处理滚动效果：增加毛玻璃底色和阴影
const handleScroll = () => {
    isScrolled.value = window.scrollY > 20;
};
onMounted(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
});
onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
});
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("min-h-screen flex flex-col relative font-sans text-slate-800 bg-[#fafcff]") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
        ...{ class: (([
                'sticky top-0 z-[100] transition-all duration-300',
                __VLS_ctx.isScrolled
                    ? 'bg-white/80 backdrop-blur-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] py-3'
                    : 'bg-white/50 backdrop-blur-sm py-5'
            ])) },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("max-w-7xl mx-auto px-6 flex items-center justify-between") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.router.push('/');
            } },
        ...{ class: ("flex items-center cursor-pointer") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-8 h-8 mr-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-sm") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("font-bold text-lg leading-none") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("text-xl font-bold tracking-tight text-slate-800") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("text-blue-500") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
        ...{ class: ("hidden md:flex items-center gap-1 lg:gap-2") },
    });
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.navItems))) {
        const __VLS_0 = {}.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
            key: ((item.path)),
            to: ((item.path)),
            custom: (true),
        }));
        const __VLS_2 = __VLS_1({
            key: ((item.path)),
            to: ((item.path)),
            custom: (true),
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        {
            const { default: __VLS_thisSlot } = __VLS_5.slots;
            const [{ navigate, isActive }] = __VLS_getSlotParams(__VLS_thisSlot);
            __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
                ...{ onClick: (navigate) },
                ...{ class: (([
                        'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer',
                        isActive
                            ? 'bg-blue-50 text-blue-600 shadow-sm'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    ])) },
            });
            (item.label);
            __VLS_5.slots['' /* empty slot name completion */];
        }
        var __VLS_5;
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.toggleMenu) },
        ...{ class: ("md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-slate-100/50 text-slate-700 hover:bg-slate-200 transition-colors") },
    });
    const __VLS_6 = {}.ElIcon;
    /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        ...{ class: ("text-xl") },
    }));
    const __VLS_8 = __VLS_7({
        ...{ class: ("text-xl") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    const __VLS_12 = ((__VLS_ctx.isMobileMenuOpen ? __VLS_ctx.Close : __VLS_ctx.Menu));
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
    const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_11.slots.default;
    var __VLS_11;
    const __VLS_18 = {}.Transition;
    /** @type { [typeof __VLS_components.Transition, typeof __VLS_components.Transition, ] } */ ;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
        name: ("mobile-menu"),
    }));
    const __VLS_20 = __VLS_19({
        name: ("mobile-menu"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    if (__VLS_ctx.isMobileMenuOpen) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("fixed top-[72px] left-0 right-0 z-[95] bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-xl md:hidden overflow-hidden") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
            ...{ class: ("flex flex-col p-4 gap-2") },
        });
        for (const [item] of __VLS_getVForSourceType((__VLS_ctx.navItems))) {
            const __VLS_24 = {}.RouterLink;
            /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
            // @ts-ignore
            const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
                key: ((item.path)),
                to: ((item.path)),
                custom: (true),
            }));
            const __VLS_26 = __VLS_25({
                key: ((item.path)),
                to: ((item.path)),
                custom: (true),
            }, ...__VLS_functionalComponentArgsRest(__VLS_25));
            {
                const { default: __VLS_thisSlot } = __VLS_29.slots;
                const [{ navigate, isActive }] = __VLS_getSlotParams(__VLS_thisSlot);
                __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
                    ...{ onClick: (navigate) },
                    ...{ class: (([
                            'px-5 py-3.5 rounded-xl text-base font-medium transition-colors cursor-pointer',
                            isActive
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-slate-600 hover:bg-slate-50'
                        ])) },
                });
                (item.label);
                __VLS_29.slots['' /* empty slot name completion */];
            }
            var __VLS_29;
        }
    }
    __VLS_23.slots.default;
    var __VLS_23;
    const __VLS_30 = {}.Transition;
    /** @type { [typeof __VLS_components.Transition, typeof __VLS_components.Transition, ] } */ ;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
        name: ("fade"),
    }));
    const __VLS_32 = __VLS_31({
        name: ("fade"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    if (__VLS_ctx.isMobileMenuOpen) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: (__VLS_ctx.closeMenu) },
            ...{ class: ("fixed inset-0 top-[72px] bg-slate-900/20 z-[90] backdrop-blur-sm md:hidden") },
        });
    }
    __VLS_35.slots.default;
    var __VLS_35;
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
        ...{ class: ("flex-1 w-full relative flex flex-col") },
    });
    const __VLS_36 = {}.RouterView;
    /** @type { [typeof __VLS_components.RouterView, typeof __VLS_components.routerView, typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ] } */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({}));
    const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
    {
        const { default: __VLS_thisSlot } = __VLS_41.slots;
        const [{ Component }] = __VLS_getSlotParams(__VLS_thisSlot);
        const __VLS_42 = {}.KeepAlive;
        /** @type { [typeof __VLS_components.KeepAlive, typeof __VLS_components.keepAlive, typeof __VLS_components.KeepAlive, typeof __VLS_components.keepAlive, ] } */ ;
        // @ts-ignore
        const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({}));
        const __VLS_44 = __VLS_43({}, ...__VLS_functionalComponentArgsRest(__VLS_43));
        if (__VLS_ctx.route.meta.keepAlive) {
            const __VLS_48 = ((Component));
            // @ts-ignore
            const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
                key: ((__VLS_ctx.route.path)),
            }));
            const __VLS_50 = __VLS_49({
                key: ((__VLS_ctx.route.path)),
            }, ...__VLS_functionalComponentArgsRest(__VLS_49));
        }
        __VLS_47.slots.default;
        var __VLS_47;
        if (!__VLS_ctx.route.meta.keepAlive) {
            const __VLS_54 = ((Component));
            // @ts-ignore
            const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
                key: ((__VLS_ctx.route.path)),
            }));
            const __VLS_56 = __VLS_55({
                key: ((__VLS_ctx.route.path)),
            }, ...__VLS_functionalComponentArgsRest(__VLS_55));
        }
        __VLS_41.slots['' /* empty slot name completion */];
    }
    var __VLS_41;
    ['min-h-screen', 'flex', 'flex-col', 'relative', 'font-sans', 'text-slate-800', 'bg-[#fafcff]', 'sticky', 'top-0', 'z-[100]', 'transition-all', 'duration-300', 'max-w-7xl', 'mx-auto', 'px-6', 'flex', 'items-center', 'justify-between', 'flex', 'items-center', 'cursor-pointer', 'w-8', 'h-8', 'mr-2', 'rounded-lg', 'bg-gradient-to-br', 'from-blue-500', 'to-cyan-400', 'flex', 'items-center', 'justify-center', 'text-white', 'shadow-sm', 'font-bold', 'text-lg', 'leading-none', 'text-xl', 'font-bold', 'tracking-tight', 'text-slate-800', 'text-blue-500', 'hidden', 'md:flex', 'items-center', 'gap-1', 'lg:gap-2', 'px-4', 'py-2', 'rounded-full', 'text-sm', 'font-medium', 'transition-all', 'duration-200', 'cursor-pointer', 'md:hidden', 'flex', 'items-center', 'justify-center', 'w-10', 'h-10', 'rounded-full', 'bg-slate-100/50', 'text-slate-700', 'hover:bg-slate-200', 'transition-colors', 'text-xl', 'fixed', 'top-[72px]', 'left-0', 'right-0', 'z-[95]', 'bg-white/95', 'backdrop-blur-xl', 'border-b', 'border-slate-100', 'shadow-xl', 'md:hidden', 'overflow-hidden', 'flex', 'flex-col', 'p-4', 'gap-2', 'px-5', 'py-3.5', 'rounded-xl', 'text-base', 'font-medium', 'transition-colors', 'cursor-pointer', 'fixed', 'inset-0', 'top-[72px]', 'bg-slate-900/20', 'z-[90]', 'backdrop-blur-sm', 'md:hidden', 'flex-1', 'w-full', 'relative', 'flex', 'flex-col',];
    var __VLS_slots;
    var $slots;
    let __VLS_inheritedAttrs;
    var $attrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            RouterView: RouterView,
            Menu: Menu,
            Close: Close,
            route: route,
            router: router,
            isMobileMenuOpen: isMobileMenuOpen,
            isScrolled: isScrolled,
            navItems: navItems,
            toggleMenu: toggleMenu,
            closeMenu: closeMenu,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=App.vue.js.map