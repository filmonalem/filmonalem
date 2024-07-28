<template>
    <div class="flex  bottom-0 ">

        <div class="h-100 flex align- justify-space-between">
            <!-- 👉 Footer: left content -->
            <span class="d-flex align-center">
                &copy;
                {{ new Date().getFullYear() }}
                Made With
                <icon name="bi-heart" color="red" size="1.25rem" class="mx-1" />
                By <a target="_blank" rel="noopener noreferrer" class="text-purple-700 ms-1">Apex</a>
            </span>
            <!-- 👉 Footer: right content -->
            <span class="d-md:flex gap-x-4 text-gray-700 d-none">
                <a disabled>License</a>
            </span>
        </div>
    </div>
</template>