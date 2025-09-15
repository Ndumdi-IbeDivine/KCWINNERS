<template>
    <div>
        <div class="font-bold text-[33px]">Support</div>
        <div class="grid md:grid-cols-2 gap-3 items-center">
            <div class="text-[#747474]">
                Read our Terms & Condition, and Privacy Policy
            </div>
            <div class="flex md:justify-end">
                <DashboardModal
                    modal-title="Contact Us"
                    btn-title="Contact Us"
                    :showOnlyCancel="true"
                    continue-btn="Close"
                >
                    <div class="my-[16px] text-[18px]">
                        Address: Suite 1, AP Filling Station Complex, Oke-Afa,
                        Isolo, Lagos
                    </div>
                    <div>
                        Email:
                        <a
                            href="mailto:kcwinners3@gmail.com"
                            class="hover:underline"
                            >kcwinners3@gmail.com</a
                        >
                    </div>
                    <div class="my-[16px]">
                        Class:
                        <a href="tel:+2349136757875" class="hover:underline"
                            >09136757875</a
                        >
                    </div>
                </DashboardModal>
            </div>
        </div>

        <div class="bg-white rounded-lg p-5 lg:p-[40px] mt-[57px]">
            <div class="mt-[17px]">
                <div class="font-bold text-[#292B32]">Terms & Conditions</div>
                These are the terms and conditions that every member of KC
                Winners must follow to enjoy the contribution scheme and get
                their full reward:
                <ol>
                    <li>
                        <strong>Contribution:</strong> You must contribute
                        ₦2,000 every week for 30 weeks (7 months) — payment must
                        be made on or before every Thursday.
                    </li>
                    <li>
                        <strong>Registration Fee:</strong> First-time
                        registration (activation) is ₦3,500 — this opens your
                        first (primary) contribution account.
                    </li>
                    <li>
                        <strong>Extra Accounts:</strong> Adding another
                        contribution account costs ₦3,000 each — this money will
                        be taken straight from your wallet.
                    </li>
                    <li>
                        <strong>Wallet Funding:</strong> Your contributions are
                        deducted from your wallet automatically every Thursday —
                        make sure your wallet has money before Thursday to avoid
                        missing a payment.
                    </li>
                    <li>
                        <strong>Defaults (Missed Payments):</strong> If you miss
                        a weekly payment, you must pay double the total amount
                        owed before your account can be considered up to date.
                        <br />
                        You can clear your defaults anytime — during the 30-week
                        contribution period or even after you finish
                        contributing — but you must clear them before you can
                        withdraw your payout.
                    </li>
                    <li>
                        <strong>Referrals:</strong> Every account must have at
                        least one referral within 3 months of activation or
                        account creation to get foodstuff incentives at the end.
                    </li>
                    <li>
                        <strong>Referral Code:</strong> Your referral is tied to
                        your account. Either get a new person to register with
                        your referral code or open another account with your own
                        code to meet the requirement. Each account can only earn referral reward once. Want more? Open another account.
                    </li>
                    <li>
                        <strong>No Money Transfer Between Members:</strong> You
                        cannot send money to another person’s account — every
                        member must complete their own contributions.
                    </li>
                    <li>
                        <strong>Large Accounts:</strong> If you are running 50
                        accounts or more, you must complete payments in 4 parts
                        as agreed.
                    </li>
                    <li>
                        <strong>Death or Emergency:</strong> If a member dies or
                        something serious happens, the Next of Kin must finish
                        the contributions and pay any defaults within one month
                        (4 weeks) of reporting to the organization.
                    </li>
                    <li>
                        <strong>No Refunds:</strong> ⚠️ No refund of money will
                        be given if you break any of these rules.
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard-layout",
});
</script>
