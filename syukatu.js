// メモを追加する関数
function addMemo(company) {
  // 企業ごとのメモ表示エリアを特定
  var memoList = document.getElementById(company + '-memo-list');
  var memoInput = document.querySelector('#' + company + ' .memo-input');
  
  var memoContent = memoInput.value.trim();
  
  if (memoContent !== "") {
      // 新しいメモ要素を作成
      var memoItem = document.createElement('div');
      memoItem.classList.add('memo-item');
      memoItem.textContent = memoContent;
      
      // 削除ボタン（×）を作成
      var deleteButton = document.createElement('span');
      deleteButton.classList.add('delete-btn');
      deleteButton.textContent = '×';
      deleteButton.onclick = function() {
          if (confirm("本当に削除しますか？")) {
              memoList.removeChild(memoItem); // メモを削除
              // ローカルストレージからも削除
              removeMemoFromStorage(company, memoContent);
          }
      };
      
      // メモアイテムに削除ボタンを追加
      memoItem.appendChild(deleteButton);
      
      // メモを企業のリストに追加
      memoList.appendChild(memoItem);
      
      // 入力フィールドをクリア
      memoInput.value = '';
      
      // ローカルストレージに保存する場合
      var memos = JSON.parse(localStorage.getItem(company + '-memos')) || [];
      memos.push(memoContent);
      localStorage.setItem(company + '-memos', JSON.stringify(memos));
  } else {
      alert("メモの内容を入力してください！");
  }
}

// ローカルストレージからメモを削除する関数
function removeMemoFromStorage(company, memoContent) {
  var memos = JSON.parse(localStorage.getItem(company + '-memos')) || [];
  var index = memos.indexOf(memoContent);
  if (index > -1) {
      memos.splice(index, 1); // メモを削除
      localStorage.setItem(company + '-memos', JSON.stringify(memos)); // 更新されたリストを保存
  }
}

// ページが読み込まれたときにローカルストレージからメモを読み込む
window.onload = function() {
  var companies = ['bandai', 'toinks', 'hitachi','kurosur','kurosuc','touhoku','nttfa','nttko',];
  
  companies.forEach(function(company) {
      var memos = JSON.parse(localStorage.getItem(company + '-memos')) || [];
      var memoList = document.getElementById(company + '-memo-list');
      
      // 保存されたメモがあれば、それを表示
      memos.forEach(function(memo) {
          var memoItem = document.createElement('div');
          memoItem.classList.add('memo-item');
          memoItem.textContent = memo;
          
          // 削除ボタン（×）を作成
          var deleteButton = document.createElement('span');
          deleteButton.classList.add('delete-btn');
          deleteButton.textContent = '×';
          deleteButton.onclick = function() {
              if (confirm("本当に削除しますか？")) {
                  memoList.removeChild(memoItem); // メモを削除
                  // ローカルストレージからも削除
                  removeMemoFromStorage(company, memo);
              }
          };
          
          // メモアイテムに削除ボタンを追加
          memoItem.appendChild(deleteButton);
          
          // メモを表示
          memoList.appendChild(memoItem);
      });
  });
}
