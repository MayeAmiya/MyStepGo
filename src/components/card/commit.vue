<template>
  <div class="card">
    <div class="card-header">
      <img :src="senderAvatar" alt="Sender Avatar" class="avatar">
      <div class="sender-info">
        <p class="sender-id">{{ senderId }}</p>
        <p class="sender-name">{{ senderName }}</p>
      </div>
    </div>
    <div class="card-content">
      <p>{{ content }}</p>
    </div>
    <div class="card-footer">
      <p class="send-time">{{ sendTime }}</p>
    </div>
  </div>
</template>

<script>
// 内容可能插入其他内容 底部可能附有评论中的评论 所以要递归请求
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
}

.card-header {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 16px;
}

.sender-info {
  display: flex;
  flex-direction: column;
}

.sender-id,
.sender-name {
  margin: 0;
}

.card-content {
  margin: 16px 0;
}

.card-footer {
  text-align: right;
  color: #888;
}
</style>
