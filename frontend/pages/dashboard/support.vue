<template>
    <div>
        <div class="font-bold text-[33px]">Support</div>
        <div class="grid md:grid-cols-2 gap-3 items-center">
            <div class="text-[#747474]">
                Read our Terms & Condition, and Privacy Policy
            </div>
            <div class="flex md:justify-end">
                <DashboardModal modal-title="Contact Us" btn-title="Contact Us">
                </DashboardModal>
            </div>
        </div>

        <div class="bg-white rounded-lg p-5 lg:p-[40px] mt-[57px]">
            <div class="font-bold text-[#292B32]">Terms and Conditions</div>
            <div class="mt-[17px]">
                Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                eu turpis molestie, dictum est a, mattis tellus. Sed dignissim,
                metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                interdum tellus elit sed risus. Maecenas eget condimentum velit,
                sit amet feugiat lectus. Class aptent taciti sociosqu ad litora
                torquent per conubia nostra, per inceptos himenaeos. Praesent
                auctor purus luctus enim eBorem ipsum dolor sit amet,
                consectetur adipiscing elit. Etiam eu turpis molestie, dictum
                est a, mattis tellus. Sed dignissim, metus nec fringilla
                accumsan, risus sem sollicitudin lacus, ut interdum tellus elit
                sed risus. Maecenas eget condimentum velit, sit amet feugiat
                lectus. Class aptent taciti sociosqu ad litora torquent per
                conubia nostra, per inceptos himenaeos. Praesent auctor purus
                luctus enim e Borem ipsum dolor sit amet, consectetur adipiscing
                elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
                dignissim, metus nec fringilla accumsan, risus sem sollicitudin
                lacus, ut interdum tellus elit sed risus. Maecenas eget
                condimentum velit, sit amet feugiat lectus. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos. Praesent auctor purus luctus enim eBorem ipsum dolor
                sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
                accumsan, risus sem sollicitudin lacus, ut interdum tellus elit
                sed risus. Maecenas eget condimentum velit, sit amet feugiat
                lectus. Class aptent taciti sociosqu ad litora torquent per
                conubia nostra, per inceptos himenaeos. Praesent auctor purus
                luctus enim e Borem ipsum dolor sit amet, consectetur adipiscing
                elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
                dignissim, metus nec fringilla accumsan, risus sem sollicitudin
                lacus, ut interdum tellus elit sed risus. Maecenas eget
                condimentum velit, sit amet feugiat lectus. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos. Praesent auctor purus luctus enim eBorem ipsum dolor
                sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
                accumsan, risus sem sollicitudin lacus, ut interdum tellus elit
                sed risus. Maecenas eget condimentum velit, sit amet feugiat
                lectus. Class aptent taciti sociosqu ad litora torquent per
                conubia nostra, per inceptos himenaeos. Praesent auctor purus
                luctus enim e Borem ipsum dolor sit amet, consectetur adipiscing
                elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
                dignissim, metus nec fringilla accumsan, risus sem sollicitudin
                lacus, ut interdum tellus elit sed risus. Maecenas eget
                condimentum velit, sit amet feugiat lectus. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos. Praesent auctor purus luctus enim eBorem ipsum dolor
                sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
                accumsan, risus sem sollicitudin lacus, ut interdum tellus elit
                sed risus. Maecenas eget condimentum velit, sit amet feugiat
                lectus. Class aptent taciti sociosqu ad litora torquent per
                conubia nostra, per inceptos himenaeos. Praesent auctor purus
                luctus enim e Borem ipsum dolor sit amet, consectetur adipiscing
                elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
                dignissim, metus nec fringilla accumsan, risus sem sollicitudin
                lacus, ut i
            </div>
        </div>
    </div>

    <div class="min-h-screen lg:flex">
        <div class="hidden lg:block fixed h-full w-[253px]">
            <div
                class="flex flex-col bg-[#010206] min-h-full py-[19px] px-[13px]"
            >
                <div class="flex pb-[11px]">
                    <div class="flex-1">
                        <img src="/images/logo-white.svg" alt="" />
                    </div>
                    <div class="cursor-pointer">
                        <img src="/images/streamline-flex-nav.svg" alt="" /> //
                        i want to shrink the nav, and show only icons when this
                        is clicked, and show full nav when clicked again
                    </div>
                </div>
                <hr class="border-[#63493E47]" />
                <div class="mt-8 flex-1">
                    <NuxtLink
                        to="/dashboard"
                        :class="[
                            $route.path == '/dashboard' ||
                            $route.path == '/dashboard/'
                                ? 'active-dashbord-link'
                                : '',
                            'flex gap-[13px] px-[13px] py-[15px] text-white items-center rounded-[8px] cursor-pointer',
                        ]"
                    >
                        <img src="/images/home.svg" alt="" />
                        <div class="flex-1">Dashboard</div>
                        <img src="/images/chevron-right.svg" alt="" />
                    </NuxtLink>
                    <NuxtLink
                        to="/dashboard/contributions"
                        :class="[
                            $route.path == '/dashboard/contributions' ||
                            $route.path == '/dashboard/contributions/'
                                ? 'active-dashbord-link'
                                : '',
                            'flex gap-[13px] px-[13px] py-[15px] text-white items-center rounded-[8px] cursor-pointer',
                        ]"
                    >
                        <img src="/images/shop.svg" alt="" />
                        <div class="flex-1">Contributions</div>
                        <img src="/images/chevron-right.svg" alt="" />
                    </NuxtLink>
                    <NuxtLink
                        to="/dashboard/transactions"
                        :class="[
                            $route.path == '/dashboard/transactions' ||
                            $route.path == '/dashboard/transactions/'
                                ? 'active-dashbord-link'
                                : '',
                            'flex gap-[13px] px-[13px] py-[15px] text-white items-center rounded-[8px] cursor-pointer',
                        ]"
                    >
                        <img src="/images/wallet.svg" alt="" />
                        <div class="flex-1">Transactions</div>
                        <img src="/images/chevron-right.svg" alt="" />
                    </NuxtLink>
                    <NuxtLink
                        to="/dashboard/support"
                        :class="[
                            $route.path == '/dashboard/support' ||
                            $route.path == '/dashboard/support/'
                                ? 'active-dashbord-link'
                                : '',
                            'flex gap-[13px] px-[13px] py-[15px] text-white items-center rounded-[8px] cursor-pointer',
                        ]"
                    >
                        <img src="/images/envelope.svg" alt="" />
                        <div class="flex-1">Support</div>
                        <img src="/images/chevron-right.svg" alt="" />
                    </NuxtLink>
                    <NuxtLink
                        to="/dashboard/profile"
                        :class="[
                            $route.path == '/dashboard/profile' ||
                            $route.path == '/dashboard/profile/'
                                ? 'active-dashbord-link'
                                : '',
                            'flex gap-[13px] px-[13px] py-[15px] text-white items-center rounded-[8px] cursor-pointer',
                        ]"
                    >
                        <img src="/images/profile.svg" alt="" />
                        <div class="flex-1">Profile</div>
                        <img src="/images/chevron-right.svg" alt="" />
                    </NuxtLink>
                </div>
                <div>
                    <hr class="border-[#63493E47]" />
                    <div class="mt-[25px] flex gap-[13px]">
                        <div
                            class="h-[36px] w-[36px] rounded-full bg-zinc-400"
                        ></div>
                        <div class="text-white">
                            <div class="font-semibold text-[16px]">
                                Divine Ndumdi-ibe
                            </div>
                            <div class="text-[10px]">
                                divinendumdiibe@gmail.com
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- </div> -->
        <div
            class="flex-1 px-5 py-5 lg:px-[34px] lg:py-[24px] bg-[#f6f6f6] lg:ml-[253px]"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard-layout",
});
</script>
