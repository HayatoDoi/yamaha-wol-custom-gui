ptn = "‚©‚çóM:";
command = "ping -c 1 -w " .. arg[1] .. " " .. arg[2];

rtn, str = rt.command(command);
if rtn then
  ret = string.find(str, ptn)
  if ret == nil then
    os.exit(-1)
  else
    os.exit(0)
  end
else
  os.exit(-1)
end

