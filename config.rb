require 'cgi'
################################################################################
# Blog settings
################################################################################
activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  blog.prefix = "blog"
  blog.permalink = "{category}/{title}"
  # blog.sources = "posts/:year-:month-:day-:title.html"
  blog.sources = "{year}-{month}-{day}-{title}.html"
  blog.layout = "layouts/post"
  blog.default_extension = ".markdown"
  blog.publish_future_dated = true

  # Matcher for blog source files
  # blog.taglink = "tags/{tag}.html"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  # blog.year_link = "{year}.html"
  # blog.month_link = "{year}/{month}.html"
  # blog.day_link = "{year}/{month}/{day}.html"

  # blog.tag_template = "tag.html"
  # blog.calendar_template = "calendar.html"

  # Enable pagination
  # blog.paginate = true
  # blog.per_page = 10
  # blog.page_link = "page/{num}"
end

################################################################################
# Plugins
################################################################################

# Directory structures, must be placed after blog
activate :directory_indexes
activate :livereload
activate :i18n

activate :external_pipeline do |config|
  config.name = :gulp
  config.command = build? ? 'yarn run assets:production' : 'yarn run assets:watch'
  config.source = '.tmp_assets'
  config.latency = 1
end

################################################################################
# Directory configurations
################################################################################

set :css_dir, 'assets/styles'
set :js_dir, 'assets/scripts'
set :images_dir, 'assets/images'
set :build_dir, '.build'

################################################################################
# Tasks
################################################################################

configure :build do
  activate :gzip
  activate :asset_hash
  activate :cache_buster
end

################################################################################
# Page options, layouts, aliases and proxies
################################################################################

# Per-page layout changes:
#
# With no layout
page "/admin/index.html", layout: false
page "/admin/config.yml", layout: false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :pages do
#   page "/pages/*"
# end

# Proxy pages (http://middlemanapp.com/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
page "/portfolio/*", layout: "portfolio"

# Per-page directory index changes (e.g. changes '/404/' to '/404.html' ):

page "/404.html", directory_index: false

################################################################################
# Helpers
################################################################################

# Methods defined in the helpers block are available in templates
helpers do
  def meta_title
    if current_page.data.meta_title
      return "#{current_page.data.meta_title} | #{t(:site_name)}"
    elsif current_page.data.title
      return "#{current_page.data.title} | #{t(:site_name)}"
    else
      return "#{t(:site_tagline)} | #{t(:site_name)}"
    end
  end

  def recommend_articles(current_page)
    live_articles.sort do |a, b|
      # Move to back of list if is the current page
      if a.title.eql?(current_page.title)
        1
      # Move to the front of list if the category matches this page's category
      elsif current_page.data.category.eql?(a.data.category)
        -1
      elsif a.data.category.eql?(b.data.category)
        0
      else
        1
      end
    end
  end

  def social_title
    if current_page.data.meta_title
      return current_page.data.meta_title
    elsif current_page.data.title
      return current_page.data.title
    else
      return t(:site_name)
    end
  end

  def meta_description
    if current_page.data.meta_description
      return current_page.data.meta_description
    elsif current_page.data.summary
      return current_page.data.summary
    else
      return t(:site_description)
    end
  end

  def cfd_page_classes()
    if current_page.data.body_class
      return "#{page_classes} #{current_page.data.body_class} #{yield_content(:body_classes)}"
    else
      return "#{page_classes} #{yield_content(:body_classes)}"
    end
  end

  def last_index?(array, index)
    index == array.length - 1
  end

  def live_articles
    blog.articles.keep_if do |article|
      live?(article)
    end
  end

  def live_site_content
    sitemap.resources.keep_if do |resource|
      resource.content_type.eql?("text/html; charset=utf-8") && defined?(resource.date).nil? || resource.content_type.eql?("text/html; charset=utf-8") && live?(resource)
    end
  end

  def live?(article)
    published_date(article) <= Time.now
  end

  def published_date(article)
    if article.data.live_date.nil?
      article.date
    else
      DateTime.strptime(article.data.live_date, "%Y-%m-%dT%H:%M:%S%z")
    end
  end

  def share_params
    {
      fb_app_id: data.site.facebook_app_id,
      page_type: "page",
      redirect_url: CGI.escape("#{data.site.url}#{current_page.url}?share_thanks=true"),
      url: CGI.escape("#{data.site.url}#{current_page.url}"),
      title: CGI.escape(current_page.title),
      twitter_id: "code4designers",
      provider: CGI.escape("Code for Designers")
    }
  end

  def facebook_share_url
    params = share_params
    "https://www.facebook.com/dialog/share?app_id=#{params[:fb_app_id]}&display=#{params[:page_type]}&href=#{params[:url]}&redirect_uri=#{params[:redirect_url]}"
  end

  def linkedin_share_url
    params = share_params
    "https://www.linkedin.com/shareArticle?mini=true&url=#{params[:url]}&title=#{params[:title]}&source=#{params[:provider]}"
  end

  def twitter_share_url
    params = share_params
    "https://twitter.com/intent/tweet?url=#{params[:url]}&text=#{params[:title]}&via=#{params[:twitter_id]}"
  end

  def format_date_rss
    '%a, %d %B %Y %H:%M:%S %Z'
  end
end
