---
title: "我的 Vim 常用插件和键位映射配置"
tags:
  - plugin
  - Vim
toc: false
---

写给那些从来不使用别人的 Vim 的人。

记得刚接触 Mac 时，我是用  <a href="http://panic.com/coda/" target="_blank">Coda</a>  写代码的，写了很长很长时间。之后  <a href="http://www.sublimetext.com" target="_blank">Sublime Text</a>  大火，便也尝试了几个月。到了如今，已经不知不觉地当了两年的 Vim 党。

Vim 是个神奇的编辑器，不论编辑哪种语言的代码，总能找到一些插件来提升编码体验。就算是用了挺久的 Vim，也时不时地会听到别人说起一些自己从没用过但是很实用的技巧。虽然有时也会怀念 Coda 漂亮的界面和方便的远程文件管理，会怀念 Sublime Text   功能强大却又容易上手的设计理念。但是从没有一种理由让我换用其它编辑器，因为总会有一个 Vim 插件能够填补你内心深处的不满足。

我主要用 Vim 写些网页前后端代码，下面我将分享一些我在用的 Vim 插件和键位映射配置，完整的 .vimrc 文件可以在<a href="https://github.com/luin/dotfiles/blob/master/vimrc" target="_blank">这里</a>看到。

<!-- more -->

## 插件

1. <a href="https://github.com/gmarik/vundle" target="_blank">Vundle</a>
   Vundle 是一个 Vim 的插件管理工具，它使得安装插件不过是在 .vimrc 文件中增加一行描述那么简单。Vundle 吸引我的最重要的原因是让我可以将插件和其对应的配置（如键位映射）写在一起，这样当要删除某个插件时，也能很方便地将对应的配置删除。

   比如下面的 .vimrc 片段中，`Bundle` 语句告诉了 Vundle 要安装的插件名，而我将每个插件的配置写在了相应的 Bundle 的下面。这样当我要删除 Lokaltog/vim-easymotion 插件时，就可以很方便地将其对应的配置 `let g:EasyMotion_leader_key = 'f'` 删除，避免了因为插件描述和其配置分隔两处造成的不同步现象。

   ```vim
   Bundle 'Lokaltog/vim-easymotion'
   let g:EasyMotion_leader_key = 'f'

   Bundle 'bling/vim-airline'
   let g:airline_left_sep = ''
   let g:airline_right_sep = ''
   ```

2. <a href="https://github.com/Lokaltog/vim-easymotion" target="_blank">Easymotion</a>
   `f<char>` 可以实现定位到一行中的某个字符，如 `fa` 会定位到当前光标到行末出现的第一个 "a"。然而如果存在多个 "a"，就得通过 `f<number>a` 来完成定位。而使用 Easymotion 后，只需要敲击 `<leader><leader>fa`，则该行及该行以下所有的 "a" 都将被高亮并标记序号，此时再按相应的序号即可定位到指定的 "a"。

   `<leader><leader>` 是 Easymotion 默认的引导键，也可以自定义。比如我将其定义为 "f"，这样用 "f" 定位字符只需要按 `ff<char>` 即可，非常方便。

   Easymotion 不仅支持 `f`，还支持其它定位功能键，如 `w`、`t`。不过我 99% 的时间都只用其和 "f" 来配合。

3. <a href="https://github.com/bling/vim-airline" target="_blank">Airline</a>
   Airline 和 Powerline 类似，都是在 Vim 底部显示一个很好看的状态条，可以自定义状态条中的显示项目。不同的是 Airline 更加轻量，而且支持一些特殊插件的状态显示。

4. <a href="https://github.com/scrooloose/nerdtree" target="_blank">The NERD tree</a>
   The NERD tree 是 Vim 中的资源管理器，它是我最常用的插件之一。The NERD tree 能够查看文件夹下文件列表（包括标记文件类型状态等），执行复制、移动和删除文件（夹）等操作。

   我将 Shift + m 映射为切换  The NERD tree 窗口（`map <S-m> <plug>NERDTreeTabsToggle<CR>`）。

5. <a href="https://github.com/scrooloose/syntastic" target="_blank">Syntastic</a>
   Syntastic 是一个语法检查工具，它通过外部语法检查器来校验代码，并将结果显示在 Vim 的状态栏中。Syntastic 是一个神级的插件，它可以极大地减少编码出错的概率，对于脚本语言开发者来说绝对是一个福音。

   对我而言，Syntastic 最大的作用就是校验 JavaScript 代码。我通过配置 Syntastic 使用代码质量检查工具 JSHint 来检查代码错误，同时控制代码质量。

6. <a href="https://github.com/vim-scripts/bufexplorer.zip" target="_blank">bufexplorer</a>
   bufexplorer 可以加快切换 buffer 的速度。我通过 `noremap <silent> <CR> :BufExplorer<CR>` 将回车键映射为显示 buffer 列表，同时在 buffer 列表中还可以使用回车键选择想要编辑的 buffer，非常方便。

7. <a href="https://github.com/vim-scripts/nerdtree-ack" target="_blank">NERDtree + ack.vim</a>
   这个插件的名字很直白，就是 The NERD tree 和 <a href="https://github.com/mileszs/ack.vim" target="_blank">ack</a> 两个插件的合体。这个插件为 The NERD tree 的文件菜单中加入了搜索功能，可以实现搜索整个文件夹，不用再单独调用 grep 之类的命令了。

8. <a href="https://github.com/terryma/vim-multiple-cursors" target="_blank">vim-multiple-cursors</a>
   Sublime Text 支持多个光标选择功能，在重构时非常有用。这个插件将  Sublime Text 中的这个邪恶功能引入了 Vim。想要修改变量名时，只需要将光标放在变量名内，然后多次敲击 Ctrl + n，即可将多个同名变量选中，此时再按 s 就能同时将这些变量重命名了。

9. <a href="https://github.com/tpope/vim-commentary" target="_blank">Commentary</a>
   Commentary 可以帮你注释代码。只需要选中要注释的内容，然后敲击 gcc 即可将这段内容注释（Commentary 会根据当前的 filetype 使用不同的注释符号），再次敲击 gcc 即可还原注释。我做了如下映射：

   ```vim
   nmap <BS> gcc
   vmap <BS> gc
   ```

   即在 normal 模式下，敲击退格键可以注释当前行，在 visual 模式下，敲击退格键可以注释选中的内容。平时无聊时，我就会不停地按退格键来注释/还原注释，还是挺能消磨时间的 :P。

10. <a href="https://github.com/terryma/vim-expand-region" target="_blank">vim-expand-region</a>
    这个插件用来扩展选择的内容。比方说当前光标在一对双引号中，双引号包含在一对括号中，此时敲击 `+` 可以选中双引号中的内容，再敲击 `+` 可以选中括号中的内容。我将其绑定为最大的空格键以显示我对这个插件的虔诚。

## 键位映射

每个 Vim 使用者都有自己的键位映射，通过映射键位可以在一些小的地方大大提高 Vim 的使用效率。下面列举几个我的映射配置。

1. 将分号和冒号互换

   ```vim
   nnoremap ; :
   nnoremap : ;
   ```

   这样输入  `:w` 这样的命令时可以就少敲一个键了。

2. 使用左右光标键切换 buffer

   ```vim
   noremap <silent> <Left> :bp<CR>
   noremap <silent> <Right> :bn<CR>
   ```

3. 使用 `\` 键打开当前编辑的文件

   ```vim
   nnoremap \ :!open <C-R>%<CR><CR>
   ```

4. 粘贴时不置换“剪贴板”

   ```vim
   xnoremap p pgvy
   ```

   我经常复制一段内容，在 visual 模式下选中一段文本并粘贴来实现替换，此时“剪贴板”中的内容会被替换成被删掉的文本，如果想粘贴第二次就很不方便了。这个映射解决了这个问题。
