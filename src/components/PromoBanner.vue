<script setup>
const items = [
  '🚚 滿 NT$1,000 免運費',
  '🎁 新會員登入享 9 折序號',
  '⚡ 24 小時內快速出貨',
  '💬 line 客服線上即時回覆'
];
</script>

<template>
  <div class="promo-banner">
    <div class="track">
      <span v-for="i in 2" :key="i" class="loop">
        <span v-for="(item, idx) in items" :key="idx" class="item">{{ item }}</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.promo-banner {
  background: var(--ink);
  color: var(--surface);
  overflow: hidden;
  padding: 0.55rem 0;
}

.track {
  display: flex;
  width: max-content;
  animation: scroll 22s linear infinite;
}

.loop {
  display: flex;
  flex-shrink: 0;
}

.item {
  padding: 0 2.5rem;
  font-size: 0.85rem;
  white-space: nowrap;
  font-family: 'IBM Plex Mono', monospace;
}

@keyframes scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
</style>