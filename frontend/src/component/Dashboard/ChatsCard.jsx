const ChatsCard = () => {
  return (
    <a
      href="messages.html"
      class="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
    >
      <div class="relative h-14 w-14 rounded-full">
        <img src="./images/user/user-03.png" alt="User" />
        <span class="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-meta-3"></span>
      </div>

      <div class="flex flex-1 items-center justify-between">
        <div>
          <h5 class="font-medium text-black dark:text-white">Devid Heilo</h5>
          <p>
            <span class="text-sm font-medium text-black dark:text-white">
              Hello, how are you?
            </span>
            <span class="text-xs"> . 12 min</span>
          </p>
        </div>
        <div class="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
          <span class="text-sm font-medium text-white">3</span>
        </div>
      </div>
    </a>
  );
};

export default ChatsCard