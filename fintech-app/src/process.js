if (typeof window !== 'undefined' && !window.process) {
  window.process = {
    env: {
      NODE_ENV: process.env.NODE_ENV || 'development'
    },
    nextTick: function (callback) {
      setTimeout(callback, 0);
    },
    // Add other process methods as needed
    browser: true,
    version: '',
    versions: {},
    platform: 'browser',
    cwd: function() { return '/' },
    chdir: function() {},
    exit: function() {},
    kill: function() {},
    pid: 0,
    title: 'browser',
    arch: 'browser',
    argv: [],
    execArgv: [],
    execPath: '',
    hrtime: function() { return [0, 0] },
    cpuUsage: function() { return { user: 0, system: 0 } },
    memoryUsage: function() { return { rss: 0, heapTotal: 0, heapUsed: 0, external: 0 } },
    uptime: function() { return 0 },
  };
}
