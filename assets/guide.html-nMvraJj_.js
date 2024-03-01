import{_ as n,o as s,c as a,b as e}from"./app-6ldeWLzQ.js";const t={},i=e(`<h2 id="编程规范" tabindex="-1"><a class="header-anchor" href="#编程规范" aria-hidden="true">#</a> 编程规范</h2><ul><li>避免多余的else语句</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>//example 差
func absoluteNumber(x int)int{
    if x&gt;=0{
        return x
    }else{
        return -x
    }
}
//好
func absoluteNumber(x int)int{
    if x&gt;=0{
        return x
    }
    return -x
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>保持正常代码路径为最小缩进</li></ul><blockquote><p>正常代码路径是指在没有异常情况下代码所执行的路径。</p><p>保持正常代码路径不缩进，能提高代码的可读性。如果正常代码路径路径很长，那么理解正常代码路径上的代码需要记住很多上下文，增加理解的难度。</p></blockquote><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>//example 代码对比 错误
func fun()error{
    err:=doSomething()// 正常代码
    if err == nil{
        err:= doAnotherthing()// 正常代码
        if err == nil{
            return nil// 正常代码
        }
        return err
    }
    return err
}
//正确
func fun()error{
    err:=doSomething()// 正常代码
    if err != nil{
        return err
    }
    err:= doAnotherthing()// 正常代码
    if err != nil{
        return err
    }
    return nil// 正常代码
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>代码注释</p><ul><li>表达具体功能（What）而不是实现（How）</li><li>包的注释放在与包同名的文件下，或者单独的doc.go中。</li><li>避免不必要的注释。</li><li>注释应该使用完整的句子，开头使用函数或者变量的名字。</li></ul></li><li><p>Panic</p><ul><li>Panic 是运行时异常。</li><li>一旦执行到panic后： <ul><li>当前执行的函数会停止。</li><li>代码之前调用的defer均会执行。</li><li>如果不使用recover处理panic，整个程序也会终止。</li></ul></li><li>什么时候使用panic <ul><li>没法恢复的error，导致程序没法继续执行。</li><li>认为产生的错误。</li></ul></li><li>如何处理panic <ul><li>在defer调用的函数中使用recover。</li><li>defer 函数位于目标函数之前。</li></ul></li></ul></li><li><p>Error</p><ul><li>error是一个包含Error() string 函数的接口。</li><li>自定义错误，实现Error() string函数即可，Unwrap() string</li><li>如何匹配error <ul><li>error.Is()</li><li>error.As()</li></ul></li></ul></li><li><p>指针</p><ul><li>什么时候使用指针 <ul><li>方法/函数需要修改对象/参数时</li><li>传递大的数据时</li></ul></li></ul></li></ul><h2 id="匿名函数" tabindex="-1"><a class="header-anchor" href="#匿名函数" aria-hidden="true">#</a> 匿名函数</h2><p>匿名函数捕获外部变量时使用的引用类型，而不是值类型。<strong>警告：捕获迭代变量</strong>，在捕获迭代变量时，捕获的时该迭代变量，而不是某个时刻该迭代变量的值。</p><p>样例如下所示：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">//正确</span>
<span class="token keyword">var</span> rmdirs <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> d <span class="token operator">:=</span> <span class="token keyword">range</span> <span class="token function">tempDirs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dir <span class="token operator">:=</span> d <span class="token comment">// NOTE: necessary!</span>
    os<span class="token punctuation">.</span><span class="token function">MkdirAll</span><span class="token punctuation">(</span>dir<span class="token punctuation">,</span> <span class="token number">0755</span><span class="token punctuation">)</span> <span class="token comment">// creates parent directories too</span>
    rmdirs <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>rmdirs<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        os<span class="token punctuation">.</span><span class="token function">RemoveAll</span><span class="token punctuation">(</span>dir<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// ...do some work…</span>
<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> rmdir <span class="token operator">:=</span> <span class="token keyword">range</span> rmdirs <span class="token punctuation">{</span>
    <span class="token function">rmdir</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// clean up</span>
<span class="token punctuation">}</span>
<span class="token comment">//错误</span>
<span class="token keyword">var</span> rmdirs <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> dir <span class="token operator">:=</span> <span class="token keyword">range</span> <span class="token function">tempDirs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    os<span class="token punctuation">.</span><span class="token function">MkdirAll</span><span class="token punctuation">(</span>dir<span class="token punctuation">,</span> <span class="token number">0755</span><span class="token punctuation">)</span>
    rmdirs <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>rmdirs<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//dir是for作用域变量，rmdirs中所用 func() 类型的函数均捕获该变量，在for执行结束时，dir为tempDirs最后一个元素，执行rmdir()时，仅删除最有一个文件夹。</span>
        os<span class="token punctuation">.</span><span class="token function">RemoveAll</span><span class="token punctuation">(</span>dir<span class="token punctuation">)</span> <span class="token comment">// NOTE: incorrect!</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="deferred函数" tabindex="-1"><a class="header-anchor" href="#deferred函数" aria-hidden="true">#</a> deferred函数</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>
<span class="token comment">//!+main</span>
<span class="token keyword">func</span> <span class="token function">bigSlowOperation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// defer 仅将最后一级函数作为函数结束时执行的函数，其余函数作为表达式直接执行。</span>
    <span class="token comment">// 如下所示：多级函数（函数的返回结果是一个返回函数的函数）前两级直接执行</span>
	<span class="token keyword">defer</span> <span class="token function">trace</span><span class="token punctuation">(</span><span class="token string">&quot;bigSlowOperation&quot;</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// don&#39;t forget the extra parentheses</span>
	<span class="token comment">// ...lots of work...</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span> <span class="token comment">// simulate slow operation by sleeping</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">trace</span><span class="token punctuation">(</span>msg <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  
	start <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;enter %s (%s)&quot;</span><span class="token punctuation">,</span> msg<span class="token punctuation">,</span> start<span class="token punctuation">)</span>
	process <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;test defer&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;exit %s (%s)&quot;</span><span class="token punctuation">,</span> msg<span class="token punctuation">,</span> time<span class="token punctuation">.</span><span class="token function">Since</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> process
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">bigSlowOperation</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),p=[i];function l(o,c){return s(),a("div",null,p)}const r=n(t,[["render",l],["__file","guide.html.vue"]]);export{r as default};
