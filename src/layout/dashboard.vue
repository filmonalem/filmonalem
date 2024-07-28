<template>
    <div class="mt-5 text-center">
        <div class="error-title font-extrabold text-gray-700">
            <h1>
                welcome
                <icon class="fa fa-spin -ml-12" icon="globe"></icon> !!
            </h1>
        </div>
        <div class="flex items-center px-4 ">
            <img class="h-72 w-full md:flex-grow flex items-center px-4" src="../assets/medicine.svg" alt="">
        </div>
    </div>
</template>
<style scoped>
.error-title h1 {
    font-family: "Cascadia Code", lato sans-serif;
    font-size: 100px;
    font-weight: 500;
    animation-name: example;
    animation-duration: 40s;
    animation-delay: 3s;
    animation-iteration-count: 10;
}

.fa-spin {
    animation: fa-spin 2s infinite linear;
}

@keyframes example {
    0% {
        color: #555;
    }

    10% {
        color: #32c4d1;
    }

    20% {
        color: #f65656;
    }

    30% {
        color: #454545;
    }

    40% {
        color: #ff8827;
    }

    50% {
        color: #a3cf0c;
    }

    60% {
        color: #7accc8;
    }

    70% {
        color: #c4df9c;
    }

    80% {
        color: #fec689;
    }

    90% {
        color: #a67379;
    }

    100% {
        color: #818181;
    }
}
</style>
  